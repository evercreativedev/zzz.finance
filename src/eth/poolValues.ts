import ethers from "ethers";
import { Pool as IPool, PoolType, BasePoolData, UserPoolData } from "types";
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

export async function getPoolUserData(
  account: string,
  pool: IPool,
  provider: any
): Promise<UserPoolData> {
  return {
    id: pool.id,
    staked: await getStakedBalance(account, pool, provider),
    multiplier:
      pool.boostToken && (await getBoostMultiplier(account, pool, provider)),
    boostLevel:
      pool.boostToken && (await getBoostLevel(account, pool, provider)),
    rewards: await getRewardsAvailable(account, pool, provider),
    hasAllowance: await checkAllowance(account, pool, provider),
    hasBoostAllowance:
      pool.boostToken && (await checkBoostAllowance(account, pool, provider)),
    tokenAmount: await getERC20balance(account, pool.token, provider),
    boostTokenAmount:
      pool.boostToken &&
      (await getERC20balance(account, pool.boostToken, provider)),
    boostCosts:
      pool.boostToken && (await getBoostCosts(account, pool, provider)),
  };
}

export async function getPoolValues(
  pool: IPool,
  provider: any
): Promise<BasePoolData> {
  const poolContract = new ethers.Contract(pool.address, pool.abi, provider);

  const staked = formatResult(
    await getTotalSupply(poolContract, pool),
    pool.token.decimals
  );
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
    TVL = Math.ceil(
      staked *
        (await getPriceFor(
          pool.token,
          provider,
          pool.uniToken,
          pool.uniPairToken
        ))
    );
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
