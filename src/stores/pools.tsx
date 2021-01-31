import { observable, action, configure, runInAction, computed, autorun } from "mobx";
import { BasePoolData, Pool, PoolStatus, UserPoolData } from "types";
import { getPoolUserData, getPoolValues } from "eth/poolValues";
import PriceStore from "stores/prices";
import ReactToolTip from "react-tooltip";
import { pools } from "eth/contracts";

configure({ enforceActions: "observed" });

class Pools {
  @observable basePoolData: Map<string, BasePoolData> = new Map();
  @observable userPoolData: Map<string, UserPoolData> = new Map();

  constructor() {
    const userPoolDataCache = localStorage.getItem("zzz-user-pool-data");
    const basePoolDataCache = localStorage.getItem("zzz-base-pool-data");
    const lastSync = localStorage.getItem("zzz-pool-data-last-sync");
    if (lastSync && Date.now() - parseInt(JSON.parse(lastSync)) > 30000) {
      autorun(this.syncToStorage);
      return;
    } else {
      if (userPoolDataCache && basePoolDataCache) {
        const userPoolData = JSON.parse(userPoolDataCache);
        localStorage.removeItem("zzz-user-pool-data");
        const basePoolData = JSON.parse(basePoolDataCache);
        this.userPoolData = new Map(Object.entries(userPoolData));
        this.basePoolData = new Map(Object.entries(basePoolData));
        ReactToolTip.rebuild();
      }
      autorun(this.syncToStorage);
    }
  }

  syncToStorage = () => {
    localStorage.setItem("zzz-pool-data-last-sync", JSON.stringify(Date.now()));
    localStorage.setItem("zzz-user-pool-data", JSON.stringify(this.userPoolData));
    localStorage.setItem("zzz-base-pool-data", JSON.stringify(this.basePoolData));
  };
  // Gets base data that does not require account for ongoing pools.
  @action getOngoingPoolData = async (provider: any) => {
    pools.filter((pool) => pool.poolStatus === PoolStatus.Ongoing).forEach((pool) => this.getBasePoolData(pool, provider));
  };

  // Gets base data that does require user account
  @action getAllUserPoolData = async (account: string, provider: any) => {
    pools.forEach((pool) => runInAction(() => this.getPoolUserData(account, pool, provider)));
  };

  // Fetches single pools base data.
  @action getBasePoolData = async (pool: Pool, provider: any) => {
    const data = await getPoolValues(pool, provider);
    runInAction(() => {
      this.basePoolData.set(pool.id, data);
    });
    ReactToolTip.rebuild();
  };

  // Gets the user data from a pool, how much staked, rewards etc.
  @action getPoolUserData = async (account: string, pool: Pool, provider: any) => {
    const data = await getPoolUserData(account, pool, provider);

    runInAction(() => this.userPoolData.set(pool.id, data));
    ReactToolTip.rebuild();
  };

  @computed({ keepAlive: true }) get totalRewardsUSD() {
    let totalRewardsUSD = 0;
    this.userPoolData.forEach((userData) => {
      if (userData.rewards.USDRewards) {
        totalRewardsUSD = totalRewardsUSD + userData.rewards.USDRewards;
      }
    });

    return totalRewardsUSD;
  }

  @computed({ keepAlive: true }) get totalStakedUSD() {
    let totalStaked: any = {
      usd: 0,
    };
    this.userPoolData.forEach((userData) => {
      if (userData.staked) {
        const pool = pools.find((p) => p.id === userData.id);
        if (pool) {
          const tokenPrice = PriceStore.prices.get(pool.token.name);
          if (!tokenPrice) return;
          const usd = userData.staked * tokenPrice!;
          totalStaked.usd = totalStaked.usd + usd;
        }
      }
    });
    return totalStaked;
  }

  // Calculates TVL values as pool data is fetched
  @computed({ keepAlive: true }) get totalTVL() {
    let tvl = {
      usd: 0,
      zzz: 0,
      nap: 0,
    };
    this.basePoolData.forEach((pool) => {
      if (pool && pool.TVL && isFinite(pool.TVL)) {
        tvl.usd = tvl.usd + pool.TVL;
      }
      if (pool.stakingToken.name === "ZZZNAPLP" || pool.stakingToken.name === "ZZZETHLP") {
        if (pool.underlyingTokens && pool.underlyingTokens.token1 && pool.underlyingTokens.token2) {
          tvl.zzz = tvl.zzz + pool.underlyingTokens.token1;
          tvl.nap = tvl.nap + pool.underlyingTokens.token2;
        }
      }
      if (pool.stakingToken.name === "ZZZ") {
        tvl.zzz = tvl.zzz + pool.staked;
      }
      if (pool.stakingToken.name === "NAP") {
        tvl.nap = tvl.nap + pool.staked;
      }
    });
    return tvl;
  }
}

export default new Pools();
