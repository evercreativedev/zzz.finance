import React from "react";
import PartnerTexts from "./PartnerTexts";
import "./PoolInfo.scss";

type Props = {
  partnerName: string;
  poolIcon: any;
};

function PoolInfo({ partnerName, poolIcon }: Props) {
  const PartnerText = PartnerTexts[partnerName];
  return (
    <div className="pool-info">
      <div className="image-container">
        {poolIcon && poolIcon.length > 5 && (
          <img
            src={poolIcon}
            alt={partnerName}
            style={{ width: "10%", height: "10%" }}
          />
        )}
      </div>
      <PartnerText />
    </div>
  );
}

export default PoolInfo;
