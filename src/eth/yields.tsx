import { ethers } from "ethers";
import { getPriceFor } from "./prices";
import { Pool, PoolType, Yields, PoolStatus } from "../types";
import { formatResult } from "helpers/utils";
import PriceStore from "stores/prices";
import { runInAction } from "mobx";

export async function getYields(pool: Pool, provider: any) {
  if (
    pool.poolStatus === PoolStatus.Closed ||
    pool.poolStatus === PoolStatus.Retired
  )
    return null;
  switch (pool.poolType) {
    case PoolType.LP: {
      return getYieldLP(pool, provider);
    }
    case PoolType.SingleTokenLPOutput: {
      return getYieldSingleTokenLPOutput(pool, provider);
    }
    case PoolType.SingleToken: {
      return getYieldSingleToken(pool, provider);
    }
  }
}

/**
 *  Gets yield for LP input pool.
 */

async function getYieldLP(pool: Pool, provider: any): Promise<Yields | null> {
  if (!pool.uniPairToken2 && !pool.uniPairToken) return null;
  // Initiate pool
  const POOL = new ethers.Contract(pool.address, pool.abi, provider);

  // Staking token address (LP TOKENS)
  const STAKE_TOKEN = new ethers.Contract(
    pool.token.address,
    pool.token.abi,
    provider
  );

  // Weekly reward for the pool
  const totalStakedUNI = formatResult(
    await STAKE_TOKEN.balanceOf(POOL.address),
    pool.token.decimals
  );
  const weeklyReward = await getUniPoolWeeklyRewards(POOL);

  const rewardPerToken = weeklyReward / totalStakedUNI;
  const {
    REWARD_TOKEN_PRICE,
    STAKING_TOKEN_PRICE,
  } = await getStakingAndRewardTokenPrices(pool, provider);

  const weeklyROI = (
    (rewardPerToken * REWARD_TOKEN_PRICE * 100) /
    STAKING_TOKEN_PRICE
  ).toFixed(2);

  return {
    rewardPerToken,
    dailyROI: (parseFloat(weeklyROI) / 7).toFixed(2),
    weeklyROI,
    yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2),
  };
}

/**
 *  Gets yield for single token input pool
 */

async function getYieldSingleToken(
  pool: Pool,
  provider: any
): Promise<Yields | null> {
  const POOL_CONTRACT = new ethers.Contract(pool.address, pool.abi, provider);

  const STAKING_TOKEN = new ethers.Contract(
    pool.token.address,
    pool.token.abi,
    provider
  );

  // Weekly reward for the pool
  const TOTAL_STAKED = (await STAKING_TOKEN.balanceOf(pool.address)) / 1e18;
  const weeklyReward = await getUniPoolWeeklyRewards(POOL_CONTRACT);

  const rewardPerToken = weeklyReward / TOTAL_STAKED;
  const {
    REWARD_TOKEN_PRICE,
    STAKING_TOKEN_PRICE,
  } = await getStakingAndRewardTokenPrices(pool, provider);

  const weeklyROI =
    (rewardPerToken * REWARD_TOKEN_PRICE * 100) / STAKING_TOKEN_PRICE;
  return {
    rewardPerToken,
    dailyROI: (weeklyROI / 7).toFixed(2),
    weeklyROI: weeklyROI.toFixed(2),
    yearlyROI: (weeklyROI * 52).toFixed(2),
  };
}

/**
 *  Gets yield for single token input pool with an LP output.
 */

async function getYieldSingleTokenLPOutput(
  pool: Pool,
  provider: any
): Promise<Yields | null> {
  const POOL_CONTRACT = new ethers.Contract(pool.address, pool.abi, provider);

  const STAKING_TOKEN = new ethers.Contract(
    pool.token.address,
    pool.token.abi,
    provider
  );

  // Weekly reward for the pool
  const TOTAL_STAKED = formatResult(
    await STAKING_TOKEN.balanceOf(pool.address),
    pool.token.decimals
  );
  const weeklyReward = await getUniPoolWeeklyRewards(POOL_CONTRACT);

  const rewardPerToken = weeklyReward / TOTAL_STAKED;
  const {
    REWARD_TOKEN_PRICE,
    STAKING_TOKEN_PRICE,
  } = await getStakingAndRewardTokenPrices(pool, provider);

  const weeklyROI =
    (rewardPerToken * REWARD_TOKEN_PRICE * 100) / STAKING_TOKEN_PRICE;
  return {
    rewardPerToken,
    dailyROI: (weeklyROI / 7).toFixed(2),
    weeklyROI: weeklyROI.toFixed(2),
    yearlyROI: (weeklyROI * 52).toFixed(2),
  };
}

/**
 * Uni pool reward rate calculation
 */
async function getUniPoolWeeklyRewards(contract: any) {
  const rewardRate = await contract.rewardRate();
  return Math.round((rewardRate / 1e18) * 604800);
}

async function getStakingAndRewardTokenPrices(pool: Pool, provider: any) {
  if (process.env.REACT_APP_ENV === "LOCALTEST") {
    return {
      STAKING_TOKEN_PRICE: 6.5,
      REWARD_TOKEN_PRICE: 0.001,
    };
  }

  let STAKING_TOKEN_PRICE = PriceStore.prices.get(pool.token.name);
  if (!STAKING_TOKEN_PRICE) {
    STAKING_TOKEN_PRICE = await getPriceFor(
      pool.token,
      provider,
      pool.uniToken,
      pool.uniPairToken
    );
    runInAction(() =>
      PriceStore.prices.set(pool.token.name, STAKING_TOKEN_PRICE!)
    );
  }

  let REWARD_TOKEN_PRICE = PriceStore.prices.get(pool.reward.name);
  if (!REWARD_TOKEN_PRICE) {
    REWARD_TOKEN_PRICE = await getPriceFor(
      pool.reward,
      provider,
      pool.uniToken,
      pool.rewardTokenPair
    );
    runInAction(() =>
      PriceStore.prices.set(pool.reward.name, REWARD_TOKEN_PRICE!)
    );
  }

  return {
    REWARD_TOKEN_PRICE,
    STAKING_TOKEN_PRICE,
  };
}
