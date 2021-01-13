import { BasePoolData, Pool, PoolStatus, UserPoolData } from "types";
import PriceStore from "stores/prices";

export default (pool: Pool, userPoolData?: UserPoolData, basePoolData?: BasePoolData, inputValue?: number) => {
  if (!userPoolData) return null;
  if (!basePoolData) return null;
  const userPercentageOfTotal = userPoolData.staked > 0 ? (userPoolData.staked / basePoolData.staked) * 100 : null;

  /**
   * UI checks
   */

  // did user provide sane input
  const isSaneInput = !!inputValue && inputValue > 0 && !isNaN(inputValue);
  // is user able to stake
  const canStake =
    userPoolData.tokenAmount > 0 &&
    userPoolData.hasAllowance &&
    isSaneInput &&
    userPoolData.tokenAmount >= inputValue! &&
    (basePoolData.migrationStatus == null || basePoolData.migrationStatus === 0);

  // does user just have allowance and tokens, since max stake requires no input
  const canMaxStake = userPoolData.tokenAmount > 0 && userPoolData.hasAllowance;
  // does user have staking balance, input is sane and inputvalue is less or equal to staked
  const canWithdraw =
    userPoolData.staked > 0 &&
    isSaneInput &&
    inputValue! <= userPoolData.staked &&
    (basePoolData.migrationStatus == null || basePoolData.migrationStatus === 2);
  // does user have staking balance
  const canMaxWithdraw = userPoolData.staked > 0 && (basePoolData.migrationStatus == null || basePoolData.migrationStatus === 2);
  // does user have rewards
  const canClaim = userPoolData.rewards.tokens > 0 && (basePoolData.migrationStatus == null || basePoolData.migrationStatus === 2);
  // does user have anything to exit with
  const canExit =
    (basePoolData.migrationStatus == null || basePoolData.migrationStatus === 2) &&
    (userPoolData.staked > 0 || userPoolData.rewards.tokens > 0);
  // Get the reward price
  const rewardPrice = PriceStore.prices.get(pool.reward.name);
  // Is the pool closed?
  const poolClosed = pool.poolStatus === PoolStatus.Retired || pool.poolStatus === PoolStatus.Closed;

  // Do we display yields for this pool?
  const displayYields = basePoolData && !poolClosed && basePoolData.APY && isFinite(basePoolData.APY.weeklyROI);

  /**
   *  Calculate ROIs from the weekly amount.
   */
  const weeklyROI = basePoolData.APY && !poolClosed && basePoolData.APY.weeklyROI;
  const yearlyROI = weeklyROI ? weeklyROI * 52 : null;
  let weeklyUSD = null;
  if (rewardPrice && basePoolData.APY && !poolClosed) {
    weeklyUSD = basePoolData.APY.rewardPerToken * userPoolData.staked * rewardPrice * userPoolData.multiplier!;
  }

  return {
    userPercentageOfTotal,
    displayYields,
    canStake,
    canWithdraw,
    canExit,
    canMaxStake,
    canClaim,
    poolClosed,
    weeklyROI: parseFloat(weeklyROI),
    yearlyROI,
    weeklyUSD,
    canMaxWithdraw,
  };
};
