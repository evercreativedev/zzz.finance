import React, { useEffect } from "react";
import PoolStore from "stores/pools";
import { Pool as IPool, PoolStatus, PoolType } from "types";
import { observer } from "mobx-react";
import EthStore from "stores/eth";

type Props = {
  pool: IPool;
};

function MiniPool({ pool }: Props) {
  const basePoolData = PoolStore.basePoolData.get(pool.id);

  useEffect(() => {
    if (!basePoolData) {
      PoolStore.getBasePoolData(pool, EthStore.provider);
    }
  }, [pool, basePoolData]);

  return (
    <>
      {pool.poolIconType ? (
        <div>
          <img
            className="value value-icon"
            src={pool.poolIcon}
            alt={pool.name}
            height="30"
          />
        </div>
      ) : (
        <div className="value value-icon">{pool.poolIcon}</div>
      )}
      <div className="value value-name">{pool.name}</div>
      <div className="value value-tvl">${basePoolData && basePoolData.TVL}</div>
      <div className="value value-staked">
        {basePoolData && basePoolData.staked && basePoolData.staked.toFixed(0)}{" "}
        {pool.token.name}
      </div>
      <div className="value value-tokens">
        {basePoolData &&
          basePoolData.underlyingTokens &&
          pool.poolType === PoolType.LP &&
          `${basePoolData.underlyingTokens.token1.toFixed(
            0
          )} / ${basePoolData.underlyingTokens.token2?.toFixed(0)}`}
      </div>
      <div className="value value-roi">
        {basePoolData &&
        basePoolData.APY &&
        pool.poolStatus !== PoolStatus.Retired &&
        pool.poolStatus !== PoolStatus.Closed &&
        isFinite(basePoolData.APY.yearlyROI)
          ? `${basePoolData.APY.yearlyROI}%`
          : `N/A`}
      </div>
    </>
  );
}

export default observer(MiniPool);
