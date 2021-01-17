import { vaultContracts } from "eth/contracts";
import { Contract } from "ethers";
import { formatResult } from "helpers/utils";
import { observable, action, configure, runInAction } from "mobx";
import { VaultUserInfo, VaultInfo, Token, VaultBoostData } from "types";
import PriceStore from "./prices";
import EthStore from "./eth";
import handleTransaction from "helpers/handleTransaction";
import { parseEther } from "ethers/lib/utils";

configure({ enforceActions: "observed" });

class VaultStore {
  @observable vaultData: Map<string, VaultInfo> = new Map();
  @observable userVaultData: Map<string, VaultUserInfo> = new Map();
  @observable vaultBoostData: Map<string, VaultBoostData> = new Map();
  @observable boostTokenAllowances: Array<boolean> = [];
  @observable vaultAmount: number = 0;
  @observable epoch = 0;
  @observable epochStartBlock = 0;
  @observable NAPb = 0;
  @observable ZZZb = 0;
  contracts = vaultContracts.homestead;
  vault: any;
  multiplier: any;
  boostTokens: any;

  @action initialize = async () => {
    this.vault = new Contract(this.contracts.vault.address, this.contracts.vault.abi, EthStore.signer);
    this.multiplier = new Contract(this.contracts.multiplier.address, this.contracts.multiplier.abi, EthStore.signer);
    this.boostTokens = this.contracts.boostTokens.map((token: Token) => new Contract(token.address, token.abi, EthStore.signer));
    const vaultAmount = Number(await this.vault.vaultAmount());
    const epoch = Number(await this.vault.epoch());
    const epochStartBlock = Number(await this.vault.epochCalculationStartBlock());

    runInAction(() => (this.vaultAmount = vaultAmount));
    runInAction(() => (this.epoch = epoch));
    runInAction(() => (this.epochStartBlock = epochStartBlock));
  };

  @action fetchVaultData = async (vaultId: number) => {
    // Get the pool info, only one for now.
    const vaultInfo: any = await this.vault.vaultInfo(vaultId);
    // Get the token used and it's balance in vault.
    const stakingToken = new Contract(vaultInfo.token, require("../eth/abi/erc20_abi.json"), EthStore.signer);
    const stakingTokenName = await stakingToken.name();

    let totalStaked = 0;
    console.log(stakingTokenName);
    if (stakingTokenName === "ZZZ V2") {
      totalStaked = formatResult(await this.vault.userZZZ());
    } else if (stakingTokenName === "NAP V2") {
      totalStaked = formatResult(await this.vault.userNAP());
    } else {
      totalStaked = formatResult(await stakingToken.balanceOf(this.vault.address), 18);
    }
    const rewardsPerBlock = await this.vault.averageFeesPerBlockEpoch();

    const ZZZShare = Number(vaultInfo.allocPointZZZ) / 300;
    const NAPShare = Number(vaultInfo.allocPointNAP) / 300;

    const ZZZaveragePerBlock = ZZZShare / formatResult(rewardsPerBlock.ZZZaveragePerBlock);
    const NAPaveragePerBlock = NAPShare / formatResult(rewardsPerBlock.NAPaveragePerBlock);

    const result: VaultInfo = {
      token: stakingToken,
      allocPointNAP: Number(vaultInfo.allocPointNAP),
      allocPointZZZ: Number(vaultInfo.allocPointZZZ),
      ZZZPerBlock: ZZZaveragePerBlock,
      NAPPerBlock: NAPaveragePerBlock,
      withdrawable: vaultInfo.withdrawable,
      epoch: Number(await this.vault.epoch()),
      epochStartBlock: Number(await this.vault.epochCalculationStartBlock()),
      accZZZPerShare: Number(vaultInfo.accZZZPerShare),
      accNAPPerShare: Number(vaultInfo.accNAPPerShare),
      totalEffective: Number(vaultInfo.totalEffective),
      totalTimelockBoost: Number(vaultInfo.totalTimelockBoost),
      totalStaked,
    };

    runInAction(() => {
      this.NAPb = formatResult(rewardsPerBlock.NAPaveragePerBlock);
      this.ZZZb = formatResult(rewardsPerBlock.ZZZaveragePerBlock);
    });

    runInAction(() => this.vaultData.set(vaultId.toString(), result));

    const userInfo: any = await this.vault.userInfo(vaultId, EthStore.account);
    const pendingRewards = await this.vault.pendingRewards(vaultId, EthStore.account);
    const userResult: VaultUserInfo = {
      stakeBalance: formatResult(await stakingToken.balanceOf(EthStore.account)),
      amount: formatResult(userInfo.amount),
      ZZZRewardDebt: formatResult(userInfo.ZZZRewardDebt),
      NAPRewardDebt: formatResult(userInfo.NAPRewardDebt),
      timelockEnd: Number(userInfo.timelockEnd),
      timelockBoost: formatResult(userInfo.timelockBoost),
      boostAmount: formatResult(await this.vault.getUserBoost(vaultId, EthStore.account)),
      APY: await this.calculateAPY(vaultId),
      hasAllowance: formatResult(await stakingToken.allowance(EthStore.account, this.vault.address)) > 1000,
      zzzRewards: formatResult(pendingRewards.zzzRewards),
      napRewards: formatResult(pendingRewards.napRewards),
    };

    const boostAllowances: boolean[] = await Promise.all(
      this.boostTokens.map(
        async (contract: Contract) => formatResult(await contract.allowance(EthStore.account, this.vault.address)) > 1000
      )
    );

    runInAction(() => (this.boostTokenAllowances = boostAllowances));
    runInAction(() => this.userVaultData.set(vaultId.toString(), userResult));
    return;
  };

  // Calculate global, pool or individuals yields
  @action async calculateAPY(vaultId: number) {
    const vaultData = this.vaultData.get(vaultId.toString());
    if (!vaultData) return 0;

    let ZZZPRICE = PriceStore.prices.get("ZZZV2");
    let NAPPRICE = PriceStore.prices.get("NAPV2");
    let STAKEPRICE: any = 0;
    if (vaultId === 0) STAKEPRICE = PriceStore.prices.get("ZZZV2");
    if (vaultId === 1) STAKEPRICE = PriceStore.prices.get("ZZZETHLPV2");
    if (vaultId === 2) STAKEPRICE = PriceStore.prices.get("ZZZNAPLPV2");
    if (vaultId === 3) STAKEPRICE = PriceStore.prices.get("NAPV2");

    // if (EthStore.networkName !== "homestead") {
    //   ZZZPRICE = 50;
    //   NAPPRICE = 0.005;
    //   STAKEPRICE = 240;
    // }

    const blockPerYear = 2407905;
    if (ZZZPRICE && NAPPRICE && STAKEPRICE && vaultData) {
      const totalStaked = STAKEPRICE! * vaultData.totalStaked;
      let ZZZYield = (vaultData.ZZZPerBlock * blockPerYear * ZZZPRICE!) / totalStaked;
      let NAPYield = (vaultData.NAPPerBlock * blockPerYear * NAPPRICE!) / totalStaked;
      return ZZZYield + NAPYield;
    } else {
      return 0;
    }
  }

  @action fetchBoostData = async (vaultId: number) => {
    const currentLevels: number[] = await Promise.all(
      this.contracts.boostTokens.map(async (token: Token) => {
        return Number(
          await this.multiplier.getLastTokenLevelForUser(this.vault.address, EthStore.account, token.address, this.epoch, vaultId)
        );
      })
    );

    const boostCosts: number[][] = await Promise.all(
      this.contracts.boostTokens.map(
        async (token: Token, index: number) =>
          await Promise.all(
            [1, 2, 3, 4].map(async (level) =>
              level > currentLevels[index]
                ? formatResult(await this.vault.calculateCost(vaultId, EthStore.account, token.address, level))
                : 0
            )
          )
      )
    );

    const result: VaultBoostData = {
      levels: currentLevels,
      costs: boostCosts,
    };
    runInAction(() => this.vaultBoostData.set(vaultId.toString(), result));
  };

  deposit = async (amount: string, vaultId: number) => {
    const parsedAmount = parseEther(amount);
    await handleTransaction(async () => await this.vault.deposit(vaultId, parsedAmount), `deposit of ${amount}`, amount);
    await this.fetchVaultData(vaultId);
    return true;
  };

  withdraw = async (amount: string, vaultId: number) => {
    const parsedAmount = parseEther(amount);
    await handleTransaction(async () => await this.vault.withdraw(vaultId, parsedAmount), `withdraw of ${amount}`, amount);
    await this.fetchVaultData(vaultId);
    return true;
  };

  newEpoch = async () => {
    await handleTransaction(async () => await this.vault.startNewEpoch(), `new epoch`);
    return true;
  };

  timelock = async (vaultId: number) => {
    await handleTransaction(async () => await this.vault.timelock(vaultId), `timelock`);
    await this.fetchVaultData(vaultId);
    return true;
  };

  claim = async (vaultId: number) => {
    await handleTransaction(async () => await this.vault.claim(vaultId), `claim`);
    await this.fetchVaultData(vaultId);
    return true;
  };

  approve = async (token: Contract, vaultId: number) => {
    await handleTransaction(async () => await token.approve(this.vault.address, parseEther("100000000000")), `approval`);
    await this.fetchVaultData(vaultId);
    return true;
  };

  boostApprove = async (id: number, vaultId: number) => {
    await handleTransaction(
      async () => await this.boostTokens[id].approve(this.vault.address, parseEther("100000000000")),
      `boost approval`
    );
    await this.fetchVaultData(vaultId);
    return true;
  };

  purchase = async (vaultId: number, token: string, level: number) => {
    await handleTransaction(async () => await this.vault.purchase(vaultId, token, level), `boost purchase`);
    await this.fetchVaultData(vaultId);
    await this.fetchBoostData(vaultId);
    return true;
  };
}

export default new VaultStore();
