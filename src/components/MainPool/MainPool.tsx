import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { useWeb3React } from "@web3-react/core";
import Spinner from "react-loader-spinner";
import useUpdater from "hooks/useUpdater";
import Validation from "./Validation";
import PoolStore from "stores/pools";
import { Container, PoolData } from "components/MainPool/MainPool.styles";
import { Pool, PoolStatus } from "types";
import PoolInfoSection from "./PoolInfoSection/PoolInfoSection";
import ReactToolTip from "react-tooltip";
import PoolRoiSection from "./PoolRoiSection/PoolRoiSection";
import PoolInputSection from "./PoolInputSection/PoolInputSection";
import PoolRewardsSection from "./PoolRewardsSection/PoolRewardsSection";
import PoolBoostSection from "./PoolBoostSection/PoolBoostSection";
import PoolHeaderSection from "./PoolHeaderSection/PoolHeaderSection";
import getToolTips from "helpers/tooltips";

type Props = {
  pool: Pool;
  currentBlock: number;
};

function MainPool({ pool, currentBlock }: Props) {
  const [inputValue, setInputValue] = useState(undefined);
  const { account, library } = useWeb3React();

  // Refresh user data when we have a block or an library change.
  useEffect(() => {
    if (currentBlock !== 0) {
      PoolStore.getBasePoolData(pool, library);
      if (account) {
        PoolStore.getPoolUserData(account, pool, library);
      }
    }
  }, [currentBlock, account, pool, library]);

  // This will callback update the pool values after calling contract methods.
  const updater = useUpdater(pool, library, account);
  const signer = useMemo(() => library.getSigner(), [library]);
  const basePoolData = PoolStore.basePoolData.get(pool.id);
  const userPoolData = PoolStore.userPoolData.get(pool.id);
  const validationResults = useMemo(() => Validation(pool, userPoolData, basePoolData, inputValue), [
    pool,
    basePoolData,
    userPoolData,
    inputValue,
  ]);

  const tooltips = useMemo(() => getToolTips(userPoolData, basePoolData, validationResults?.poolClosed, inputValue), [
    userPoolData,
    basePoolData,
    validationResults,
    inputValue,
  ]);
  // Get the pool data
  if (!account) return null;

  // Get the data

  // Just display spinner if we do not have any data
  if (!basePoolData || !userPoolData) {
    // Fetch retired pools data here. We don't want to spam all of them on the app launch.
    if (pool.poolStatus === PoolStatus.Retired || pool.poolStatus === PoolStatus.Closed) {
      PoolStore.getBasePoolData(pool, library);
    }
    return <Spinner type="ThreeDots" />;
  }
  /**
   * Calculations and conditions
   */
  if (validationResults && tooltips) {
    const {
      userPercentageOfTotal,
      displayYields,
      canStake,
      canWithdraw,
      canMaxStake,
      poolClosed,
      canExit,
      canClaim,
      weeklyROI,
      yearlyROI,
      weeklyUSD,
      canMaxWithdraw,
    } = validationResults;

    const {
      tokenAmount,
      hasAllowance,
      hasBoostAllowance,
      staked: userStaked,
      rewards,
      multiplier,
      boostCosts,
      boostLevel,
      boostTokenAmount,
    } = userPoolData;

    const { staked, migrationStatus } = basePoolData;

    return (
      <Container>
        <PoolHeaderSection
          userPercentageOfTotal={userPercentageOfTotal || 0}
          userStaked={userStaked}
          totalStaked={staked}
          tooltipBoost={tooltips("boost-amount")}
          pool={pool}
          multiplier={multiplier || 0}
          data-tip="hellooo"
        />
        {pool.statusText && (
          <div className="status-text">
            <span role="img" aria-label="warning">
              ❗
            </span>{" "}
            {pool.statusText}{" "}
            <span role="img" aria-label="warning">
              ❗
            </span>
          </div>
        )}
        <PoolData>
          <PoolInfoSection pool={pool} userTokenAmount={tokenAmount} />
          <PoolRoiSection weeklyROI={weeklyROI} weeklyUSD={weeklyUSD} yearlyROI={yearlyROI} displayYields={displayYields} />
          <PoolInputSection
            canMaxWithdraw={canMaxWithdraw}
            canStake={canStake}
            canMaxStake={canMaxStake}
            canWithdraw={canWithdraw}
            hasAllowance={hasAllowance}
            poolClosed={poolClosed}
            setInputValue={setInputValue}
            tooltips={tooltips}
            inputValue={inputValue}
            account={account}
            library={library}
            signer={signer}
            pool={pool}
            updater={updater}
            migrationStatus={migrationStatus}
          />
          <PoolRewardsSection
            canClaim={canClaim}
            canExit={canExit}
            tooltips={tooltips}
            rewards={rewards}
            signer={signer}
            pool={pool}
            updater={updater}
          />
        </PoolData>
        {pool.id !== "247" && pool.id !== "248" && (
          <PoolBoostSection
            effectiveStake={pool.hasEffectiveStake}
            account={account}
            hasBoostAllowance={hasBoostAllowance}
            boostCosts={boostCosts}
            boostLevel={boostLevel}
            boostTokenAmount={boostTokenAmount}
            tooltips={tooltips}
            signer={signer}
            pool={pool}
            updater={updater}
          />
        )}
        <ReactToolTip />
      </Container>
    );
  } else return null;
}
export default observer(MainPool);
