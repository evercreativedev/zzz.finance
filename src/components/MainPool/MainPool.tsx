import React, { useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react";
import { useWeb3React } from "@web3-react/core";
import Spinner from "react-loader-spinner";
import useUpdater from "hooks/useUpdater";
import Validation from "./Validation";
import PoolStore from "stores/pools";
import { Container, PoolData } from "components/MainPool/MainPool.styles";
import { BoostInfo, Pool, PoolStatus } from "types";
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
};

function MainPool({ pool }: Props) {
  const [inputValue, setInputValue] = useState(undefined);
  const [boostSelection, setBoostSelection] = useState(0);
  const { account, library } = useWeb3React();

  // Refresh user data when we have a block or an library change.
  const basePoolData = PoolStore.basePoolData.get(pool.id);
  const userPoolData = PoolStore.userPoolData.get(pool.id);
  useEffect(() => {
    if (!basePoolData) {
      PoolStore.getBasePoolData(pool, library);
    }
    if (account && !userPoolData) {
      PoolStore.getPoolUserData(account, pool, library);
    }
  }, [account, pool, library, basePoolData, userPoolData]);

  // This will callback update the pool values after calling contract methods.
  const updater = useUpdater(pool, library, account);
  const signer = useMemo(() => library.getSigner(), [library]);
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
      boostInfoV4,
    } = userPoolData;

    const { staked, migrationStatus } = basePoolData;

    let boostInfo: BoostInfo | undefined = undefined;
    if (pool.v4 && boostInfoV4) {
      boostInfo = boostInfoV4[boostSelection];
    }

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
        {pool.v4 && (
          <div className="boost-selectors">
            {pool.boostTokens!.map((token, index) => (
              <div key={`boost-selector-${token.name}-${pool.name}`} className="boost-selector" onClick={() => setBoostSelection(index)}>
                boost with {token.name}
              </div>
            ))}
          </div>
        )}
        {pool.v4 && boostInfo && (
          <PoolBoostSection
            updater={updater}
            effectiveStake={pool.hasEffectiveStake}
            account={account}
            boostTokenAmount={boostInfo.tokenAmount}
            tooltips={tooltips}
            poolStatus={pool.poolStatus}
            boostToken={boostInfo.token}
            signer={signer}
            pool={pool}
            boostCosts={boostInfo.costs}
            boostLevel={boostInfo.currentLevel}
            hasBoostAllowance={boostInfo.hasAllowance}
          />
        )}
        {!pool.v4 && pool.boostToken && pool.id !== "247" && pool.id !== "248" && (
          <PoolBoostSection
            effectiveStake={pool.hasEffectiveStake}
            account={account}
            hasBoostAllowance={hasBoostAllowance}
            boostCosts={boostCosts}
            boostLevel={boostLevel}
            poolStatus={pool.poolStatus}
            boostToken={pool.boostToken}
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
