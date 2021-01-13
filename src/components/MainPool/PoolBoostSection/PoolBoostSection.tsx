import classNames from "classnames";
import Button from "components/Button/Button";
import { boost, getBoostAllowance } from "eth/methods";
import React, { memo } from "react";
import { Pool, PoolStatus } from "types";
import { Footer } from "./PoolBoostSection.styles";

// TODO: ADD BOOST APPROVAL

type Props = {
  pool: Pool;
  hasBoostAllowance?: boolean;
  boostTokenAmount?: number;
  boostLevel?: number;
  boostCosts?: number[];
  updater: Function;
  account: string;
  tooltips: (key: string, boostCost?: number, boostAmount?: string, effectiveStake?: boolean, currentBoostLevel?: number) => string | undefined;
  signer: any;
  effectiveStake?: boolean;
};
function PoolBoostSection({ pool, hasBoostAllowance, boostTokenAmount, boostCosts, boostLevel = 0, updater, account, tooltips, signer, effectiveStake }: Props) {
  const { boostToken, poolStatus } = pool;

  const isBoostable = boostToken && (poolStatus === PoolStatus.Ongoing || poolStatus === PoolStatus.Incoming);

  if (!isBoostable) return null;

  if (!hasBoostAllowance) {
    return (
      <Footer>
        <div className="boost-approve" onClick={() => updater(() => getBoostAllowance(account, pool, signer))}>
          Approve {boostToken!.name} before you can boost
        </div>
      </Footer>
    );
  }

  return (
    <Footer>
      {pool.boostLevels?.map(({ level, percentage }) => {
        const boostCost = boostCosts![level - 1];
        const isActive = boostCost <= 0;
        const tooPoor = boostTokenAmount! < boostCost;
        return (
          <div
            key={`boost-button-${pool.name}-${level}`}
            className={classNames("boost-button", tooPoor && "too-poor", isActive && "disabled", level <= boostLevel && "active")}
            data-tip={tooltips("boost", boostCost, percentage, effectiveStake, level)}
            onClick={() => updater(() => boost(level, pool, signer))}
          >
            <Button>
              {percentage} boost{" "}
              {!isActive ? (
                <span>
                  -{boostCost} {pool.boostToken!.name}
                </span>
              ) : (
                <span role="img" aria-label="checkmark">
                  ✔
                </span>
              )}
            </Button>
          </div>
        );
      })}
    </Footer>
  );
}
export default memo(PoolBoostSection);
