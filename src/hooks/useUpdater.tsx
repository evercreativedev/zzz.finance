import { useMemo } from "react";
import PoolStore from "stores/pools";
import ReactToolTip from "react-tooltip";
import { Pool } from "types";

export default function useUpdater(
  pool: Pool,
  provider: any,
  account?: string | null
) {
  return useMemo(
    () => (account ? createUpdater(account, pool, provider) : () => {}),
    [account, pool, provider]
  );
}

const createUpdater = (account: string, pool: Pool, provider: any) => async (
  func: Function
) => {
  await func();
  await PoolStore.getPoolUserData(account, pool, provider);
  await PoolStore.getBasePoolData(pool, provider);
  ReactToolTip.rebuild();
};
