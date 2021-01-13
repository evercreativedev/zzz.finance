import React from "react";
import { RewardsSection } from "./PoolRewardsSection.styles";
import rewardIcon from "assets/coin_stack.svg";
import { claim, exit } from "eth/methods";
import { Pool } from "types";
import Button from "components/Button/Button";

type Props = {
  rewards: {
    tokens: number;
    USDRewards: number;
  };
  pool: Pool;
  signer: any;
  updater: Function;
  tooltips: (key: string, boostCost?: number) => string | undefined;
  canClaim: boolean;
  canExit: boolean;
};
function PoolRewardsSection({ rewards, pool, signer, updater, tooltips, canClaim, canExit }: Props) {
  const { reward } = pool;

  return (
    <RewardsSection>
      <div className="rewards-title">
        <img src={rewardIcon} height="35" alt="rewards" />
        Rewards
      </div>
      <div className="rewards-amount">
        {rewards?.tokens.toFixed(2)} {reward.name}
        {pool.isMigrationPool && "V2"}
      </div>
      <div className="rewards-amount-usd">(${rewards?.USDRewards?.toFixed(2)})</div>
      <div className="button-container">
        <Button
          color="#58D68D"
          rounded={false}
          disabled={!canClaim}
          tooltip={tooltips("claim")}
          onClick={() => updater(() => claim(pool, signer))}
        >
          Claim
        </Button>
        <Button
          color="#F5B7B1"
          rounded={false}
          disabled={!canExit}
          tooltip={tooltips("exit")}
          onClick={() => updater(() => exit(pool, signer))}
        >
          Exit
        </Button>
      </div>
    </RewardsSection>
  );
}
export default PoolRewardsSection;
