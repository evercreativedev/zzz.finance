import ethers from "ethers";
import { Pool as IPool, PoolType, BasePoolData, UserPoolData, BoostInfo } from "types";
import { getPriceFor, getUNIPrice } from "eth/prices";
import { getYields } from "./yields";
import { getTotalSupply, formatResult } from "helpers/utils";
import { getUnderlyingAssets } from "./uniswap";
import PriceStore from "stores/prices";
import {
  getStakedBalance,
  getBoostMultiplier,
  getBoostLevel,
  getERC20balance,
  getRewardsAvailable,
  checkAllowance,
  checkBoostAllowance,
  getBoostCosts,
} from "eth/methods";
import { getContract } from "./contracts";

export async function getPoolUserData(account: string, pool: IPool, provider: any): Promise<UserPoolData> {
  return {
    id: pool.id,
    staked: await getStakedBalance(account, pool, provider),
    multiplier: pool.usesNewAbi ? await getBoostMultiplier(account, pool, provider) : undefined,
    boostLevel: pool.v4 ? undefined : pool.boostToken && (await getBoostLevel(account, pool, provider)),
    rewards: await getRewardsAvailable(account, pool, provider),
    hasAllowance: await checkAllowance(account, pool, provider),
    hasBoostAllowance: pool.v4 ? undefined : pool.boostToken && (await checkBoostAllowance(account, pool, provider)),
    tokenAmount: await getERC20balance(account, pool.token, provider),
    boostTokenAmount: pool.v4 ? undefined : pool.boostToken && (await getERC20balance(account, pool.boostToken, provider)),
    boostCosts: pool.v4 ? undefined : pool.boostToken && (await getBoostCosts(account, pool, provider)),
    boostInfoV4: pool.v4 ? await getBoostInfo(account, pool, provider) : undefined,
  };
}

async function getBoostInfo(account: string, pool: IPool, provider: any): Promise<BoostInfo[]> {
  const multi = getContract("Multiplier");
  const Multiplier = new ethers.Contract(multi.address, multi.abi, provider);
  const Pool = new ethers.Contract(pool.address, pool.abi, provider);

  const boostLevels = [1, 2, 3, 4];

  const addBoost = [6, 7, 8, 9];

  const result = await Promise.all(
    pool.boostTokens!.map(async (token) => {
      const Token = new ethers.Contract(token.address, token.abi, provider);

      const hasAllowance = formatResult(await Token.allowance(account, Pool.address), token.decimals) > 0;
      let costs;
      if (pool.name !== "ZZZ/ETH") {
        costs = await Promise.all(
          boostLevels.map(async (level) =>
            formatResult(await Multiplier.getSpendableCostPerTokenForUser(Pool.address, account, token.address, level), token.decimals)
          )
        );
      } else {
        costs = await Promise.all(
          addBoost.map(async (level) =>
            formatResult(await Multiplier.getSpendableCostPerTokenForUser(Pool.address, account, token.address, level), token.decimals)
          )
        );
      }
      console.log(costs);
      const tokenAmount = formatResult(await Token.balanceOf(account));
      const currentLevel = Number(await Multiplier.getLastTokenLevelForUser(Pool.address, account, token.address));
      const multiplier = Number(await Pool.getTotalMultiplier(account));
      return {
        hasAllowance,
        costs,
        currentLevel,
        tokenAmount,
        token,
        multiplier,
      };
    })
  );

  console.log(result);
  return result;
}

export async function getPoolValues(pool: IPool, provider: any): Promise<BasePoolData> {
  const poolContract = new ethers.Contract(pool.address, pool.abi, provider);

  const staked = formatResult(await getTotalSupply(poolContract, pool), pool.token.decimals);
  let migrationStatus;
  if (pool.isMigrationPool) {
    migrationStatus = Number(await poolContract.migrationStatus());
  }

  let underlyingTokens = {
    token1: 0,
    token2: 0,
  };
  let TVL = 0;

  if (pool.poolType === PoolType.LP) {
    const result = await getUnderlyingAssets(pool, provider);
    if (result) {
      underlyingTokens = result;
    }
    let uniPrice = PriceStore.prices.get(pool.token.name);
    if (!uniPrice) {
      uniPrice = await getUNIPrice(pool, provider);
    }
    TVL = Math.ceil(staked * uniPrice);
  } else {
    underlyingTokens.token1 = 0;
    TVL = Math.ceil(staked * (await getPriceFor(pool.token, provider, pool.uniToken, pool.uniPairToken)));
  }

  const APY = await getYields(pool, provider);
  return {
    icon: pool.poolIcon,
    name: pool.name,
    staked,
    underlyingTokens,
    TVL,
    APY,
    stakingToken: pool.token,
    id: pool.id,
    migrationStatus: migrationStatus == null ? undefined : migrationStatus,
  };
}
