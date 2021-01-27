import { BasePoolData, UserPoolData } from "types";

export default (
  userPoolData?: UserPoolData,
  basePoolData?: BasePoolData,
  poolsClosed: boolean = false,
  inputAmount?: number
) => (
  key: string,
  boostCost?: number | null,
  boostAmount?: string,
  effectiveStakePool?: boolean,
  tooltipBoostLevel?: number
) => {
  if (!userPoolData || !basePoolData) return;
  const inputMakesSense =
    inputAmount && inputAmount !== 0 && !isNaN(inputAmount);

  const {
    tokenAmount,
    staked,
    rewards,
    boostTokenAmount,
    multiplier,
    boostLevel,
  } = userPoolData;
  switch (key) {
    case "stake": {
      if (
        basePoolData.migrationStatus != null &&
        basePoolData.migrationStatus === 1
      ) {
        return "Pool is on migration state.";
      }
      if (poolsClosed) {
        return "Pool has finished";
      } else if (tokenAmount === 0) {
        return "You must have tokens to stake";
      } else if (!inputMakesSense) {
        return "Enter a staking amount first";
      } else if (inputAmount! > tokenAmount) {
        return "You do not have enough tokens";
      } else {
        return "";
      }
    }
    case "withdraw": {
      if (
        basePoolData.migrationStatus != null &&
        basePoolData.migrationStatus < 2
      ) {
        return "You can withdraw V2 tokens after pool is finished..";
      }
      if (staked === 0) {
        return "Nothing to withdraw";
      } else if (!inputMakesSense) {
        return "Enter an amount to withdraw first";
      } else if (inputAmount! > staked) {
        return "You are trying to withdraw more than you have staked";
      } else {
        return "";
      }
    }
    case "withdrawall": {
      if (
        basePoolData.migrationStatus != null &&
        basePoolData.migrationStatus < 2
      ) {
        return "You can withdraw V2 tokens after pool is finished..";
      }
      if (staked === 0) {
        return "You don't have anything staked";
      } else {
        return "";
      }
    }
    case "claim": {
      if (
        basePoolData.migrationStatus != null &&
        basePoolData.migrationStatus < 2
      ) {
        return "You can claim V2 rewards after pool is finished..";
      }
      if (rewards.tokens === 0) {
        return "No rewards to claim";
      } else {
        return `Claim $${rewards.USDRewards}`;
      }
    }
    case "exit": {
      if (
        basePoolData.migrationStatus != null &&
        basePoolData.migrationStatus < 2
      ) {
        return "You can exit with V2 tokens after pool is finished..";
      }
      if (staked === 0 && rewards.tokens === 0) {
        return "There is nothing for you to exit with";
      } else {
        return "Exit will claim your rewards and stakes";
      }
    }
    case "max": {
      if (
        basePoolData.migrationStatus != null &&
        basePoolData.migrationStatus === 1
      ) {
        return "Migration in progress..";
      }
      if (poolsClosed) {
        return "Pool has finished.";
      } else if (tokenAmount > 0) {
        return tokenAmount.toString();
      } else {
        return "You do not have anything to stake";
      }
    }
    case "boost-amount": {
      if (!effectiveStakePool) {
        return `Your multiplier is ${((multiplier! - 1) * 100).toFixed(
          0
        )}%. That means the yield is multiplied by ${multiplier}`;
      } else {
        return `Your multiplier is ${((multiplier! - 1) * 100).toFixed(
          0
        )}%. That means the your stake is multiplied by ${multiplier}`;
      }
    }
    case "boost": {
      const multiPercentage = ((multiplier! - 1) * 100).toFixed(0);
      if (!boostTokenAmount) {
        return "You do not have any boosting tokens.";
      }

      if (boostCost && boostAmount && boostLevel! < tooltipBoostLevel!) {
        if (boostTokenAmount < boostCost) {
          return `You're missing ${boostCost} boosting tokens.`;
        } else {
          return `Increase your multiplier of ${multiPercentage}% by ${boostAmount}`;
        }
      } else {
        if (!effectiveStakePool) {
          return `Your multiplier is ${multiPercentage}%. That means the yield is multiplied by ${multiplier}`;
        } else {
          return `Your multiplier is ${((multiplier! - 1) * 100).toFixed(
            0
          )}%. That means the your stake is multiplied by ${multiplier}`;
        }
      }
    }
  }
};
