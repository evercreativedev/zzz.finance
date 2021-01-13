import Button from "components/Button/Button";
import { getAllowance, maxStake, maxWithdraw, stake, withdraw } from "eth/methods";
import React, { memo } from "react";
import { Pool } from "types";
import { InputSection } from "./PoolInputSection.styles";

type Props = {
  hasAllowance: boolean;
  poolClosed: boolean;
  canStake: boolean;
  canWithdraw: boolean;
  canMaxStake: boolean;
  updater: Function;
  pool: Pool;
  signer: any;
  setInputValue: Function;
  inputValue?: number;
  canMaxWithdraw: boolean;
  library: any;
  account: string;
  tooltips: (key: string, boostCost?: number) => string | undefined;
  migrationStatus?: number;
};

function PoolInputSection({
  hasAllowance,
  poolClosed,
  canMaxWithdraw,
  canStake,
  canMaxStake,
  canWithdraw,
  updater,
  pool,
  signer,
  setInputValue,
  inputValue,
  tooltips,
  library,
  account,
  migrationStatus,
}: Props) {
  if (hasAllowance) {
    return (
      <InputSection>
        <input
          type="number"
          className="col the-input"
          value={inputValue}
          placeholder="Enter a stake or a withdrawal amount"
          onChange={(e) => setInputValue(parseFloat(e.target.value))}
        />
        <div className="button-container">
          {!poolClosed ? (
            <>
              {pool.id !== "247" && pool.id !== "248" && (
                <Button
                  color="#60db97"
                  rounded={false}
                  disabled={!canStake}
                  tooltip={tooltips("stake")}
                  onClick={() => updater(() => stake(pool, signer, inputValue!, setInputValue))}
                >
                  Stake
                </Button>
              )}
              {pool.id !== "247" && pool.id !== "248" && (
                <Button
                  color="#BB8FCE"
                  rounded={false}
                  disabled={!canMaxStake}
                  tooltip={tooltips("max")}
                  onClick={() => updater(() => maxStake(pool, signer, account, library))}
                >
                  Max stake
                </Button>
              )}
              <Button
                color="#58D68D"
                rounded={false}
                disabled={!canWithdraw}
                tooltip={tooltips("withdraw")}
                onClick={() => updater(() => withdraw(pool, signer, inputValue!, setInputValue))}
              >
                Withdraw{" "}
                {(pool.id === "419" || pool.id === "458") && (
                  <div style={{ marginLeft: "2px", fontWeight: "normal", fontSize: "10px", color: "#ffffff" }}>(1% tax)</div>
                )}
              </Button>
              <Button
                color="#58D68D"
                rounded={false}
                disabled={!canMaxWithdraw}
                tooltip={tooltips("withdrawall")}
                onClick={() => updater(() => maxWithdraw(pool, signer, library, account))}
              >
                Max withdraw
              </Button>
            </>
          ) : (
            <Button
              color="#58D68D"
              rounded={false}
              disabled={!canMaxWithdraw}
              tooltip={tooltips("withdrawall")}
              onClick={() => updater(() => maxWithdraw(pool, signer, library, account))}
              style={{ gridColumn: "1 / 3" }}
            >
              Withdraw all
            </Button>
          )}
        </div>
      </InputSection>
    );
  } else {
    if (pool.id !== "247" && pool.id !== "248") {
      return (
        <InputSection>
          <Button color="#60db97" onClick={() => updater(() => getAllowance(pool, signer))}>
            Approve {pool.token.name} before you can stake!
          </Button>
        </InputSection>
      );
    }
  }
  return (
    <InputSection>
      <Button color="#60db97">No new stakers for this pool. Read the message above.</Button>
    </InputSection>
  );
}
export default memo(PoolInputSection);
