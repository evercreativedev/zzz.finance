import React, { memo } from "react";
import { RoiSection } from "./PoolRoiSection.styles";

type Props = {
  displayYields: boolean;
  weeklyROI: number | null;
  yearlyROI: number | null;
  weeklyUSD: number | null;
};

function PoolRoiSection({
  displayYields,
  weeklyROI,
  yearlyROI,
  weeklyUSD,
}: Props) {
  // const USDAvailable = weeklyUSD && !isNaN(weeklyUSD);
  // const weeklyUSDReward = USDAvailable ? weeklyUSD!.toFixed(2) : "TBA";
  const weeklyReturn = weeklyROI ? weeklyROI.toFixed(2) : "TBA";
  const yearlyReturn = yearlyROI ? yearlyROI.toFixed(2) : "TBA";
  // const yearlyUsd = USDAvailable ? (weeklyUSD! * 52).toFixed(2) : "TBA";
  return (
    <RoiSection>
      <div className="roi-title">ROI</div>
      {displayYields ? (
        <>
          <div className="roi-entry">
            week <span className="roi-amount">{weeklyReturn}%</span>
          </div>
          <div className="roi-entry">
            year <span className="roi-amount"> {yearlyReturn}%</span>
          </div>
        </>
      ) : (
        <div className="roi-entry">N/A</div>
      )}
    </RoiSection>
  );
}
export default memo(PoolRoiSection);
