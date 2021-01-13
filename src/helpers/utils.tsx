import { formatUnits } from "ethers/lib/utils";
import { BigNumber, ethers } from "ethers";
import { TimerData, PoolStatus, Pool } from "types";

export function formatResult(res: BigNumber, dec: number = 18) {
  return parseFloat(formatUnits(res, dec));
}

export function getTimeRemaining(endtime: any): TimerData {
  const total = endtime.getTime() - new Date().getTime();
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const seconds = Math.floor((total / 1000) % 60);

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

export function noExponents(number: number) {
  var data = String(number).split(/[eE]/);
  if (data.length === 1) return data[0];

  var z = "",
    sign = number < 0 ? "-" : "",
    str = data[0].replace(".", ""),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";
    while (mag++) z += "0";
    return z + str.replace(/^-/, "");
  }
  mag -= str.length;
  while (mag--) z += "0";
  return str + z;
}

export function poolRetiredOrClosed(pool: Pool) {
  const result = pool.poolStatus === PoolStatus.Closed || pool.poolStatus === PoolStatus.Retired;
  return result;
}

export function isBugged(pool: Pool) {
  if (pool.name === "Snore" || pool.name === "Yawn") {
    return true;
  }
}

export async function getTotalSupply(poolContract: ethers.Contract, poolData: Pool) {
  if (poolData.usesNewAbi) {
    return await poolContract._totalSupply();
  } else {
    return await poolContract.totalSupply();
  }
}
