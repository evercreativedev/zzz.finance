import React, { useEffect, useMemo, useState } from "react";
import { TimerData, Pool } from "types";
import EthStore from "stores/eth";
import { observer } from "mobx-react";
import Spinner from "components/Spinner/Spinner";
import { ethers } from "ethers";
import { getTimeRemaining, poolRetiredOrClosed } from "helpers/utils";
import "./Timer.scss";

type Props = {
  pool: Pool;
};

enum PoolStates {
  Upcoming = 1,
  WaitingRewards,
  Started,
  Finished,
}

// Start the crop, called from the listener and useEffect when the component renders
const startPool = async (poolContract: ethers.Contract, setPoolState: Function, setEndDate: Function) => {
  const periodFinish = await poolContract.periodFinish();
  setEndDate(new Date(periodFinish * 1000));
  setPoolState(PoolStates.Started);
};

function Timer({ pool }: Props) {
  const poolContract = useMemo(
    () => new ethers.Contract(pool.address, pool.abi, EthStore.provider),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pool, EthStore.provider]
  );

  const [poolState, setPoolState] = useState<PoolStates>(PoolStates.Upcoming);

  // Timers
  const [timeUntilStart, setTimeUntilStart] = useState<TimerData>();
  const [timeUntilEnd, setTimeUntilEnd] = useState<TimerData | null>(null);

  // End and start times, end time gets populated as reward gets notified
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Duration of the pool reward drip
  const [duration, setDuration] = useState(0);

  const poolStartTimerNotReady = poolState === PoolStates.Upcoming && !timeUntilStart;
  const poolStartTimerReady = poolState === PoolStates.Upcoming && timeUntilStart;

  const poolEndTimerNotReady = poolState === PoolStates.WaitingRewards || (poolState === PoolStates.Started && !timeUntilEnd);
  const poolEndTimerReady = poolState === PoolStates.Started && timeUntilEnd;

  // Listen for the reward added event.
  useEffect(() => {
    poolContract.once("RewardAdded", async () => {
      // Switch to showing the remaining time.
      await startPool(poolContract, setPoolState, setEndTime);
    });
  }, [poolContract]);

  useEffect(() => {
    (async () => {
      const periodFinish = Number(await poolContract.periodFinish());
      let startTime;
      if (pool.usesNewAbi && pool.hasEffectiveStake && !pool.v4) {
        startTime = Number(await poolContract.startTime());
      } else if (pool.v4 && pool.startTime) {
        startTime = pool.startTime;
      } else {
        startTime = Date.now();
      }
      const now = new Date().getTime() / 1000;
      // If not set the starting dates
      if (!periodFinish || periodFinish <= 0) {
        const duration = Number(await poolContract.DURATION());
        setStartTime(new Date(startTime * 1000));
        setDuration(duration);
      }
      // Temporary state when rewards are being added
      else if (!periodFinish && startTime <= now) {
        setPoolState(PoolStates.WaitingRewards);
      }

      // Switch to showing th remaining time if we have reward period running.
      else if (periodFinish && periodFinish >= now) {
        await startPool(poolContract, setPoolState, setEndTime);
      } else {
        setPoolState(PoolStates.Finished);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolContract]);

  useEffect(() => {
    if (startTime && poolState === PoolStates.Upcoming) {
      const timer = setInterval(() => {
        // Keep the starting countdown running
        const timeUntilStart = getTimeRemaining(startTime);
        setTimeUntilStart(timeUntilStart);

        // When the timer runs out set the crop to wait for rewards and clear the interval.
        if (timeUntilStart.seconds < 0) {
          setPoolState(PoolStates.WaitingRewards);
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, poolState]);

  useEffect(() => {
    if (endTime) {
      const timer = setInterval(() => {
        setTimeUntilEnd(getTimeRemaining(endTime));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [endTime]);

  if (poolStartTimerNotReady || poolEndTimerNotReady) {
    return <Spinner width={18} height={18} type="ThreeDots" condition={false} />;
  }

  if (poolState === PoolStates.Finished || poolRetiredOrClosed(pool)) {
    return <div className="time-remaining">Rewards finished</div>;
  }

  if (poolState === PoolStates.Upcoming) {
    return (
      <div className="time-remaining">
        {poolStartTimerReady && timeUntilStart && !pool.isMigrationPool && (
          <div>
            <span role="img" aria-label="clock">
              Starts in:
            </span>
            <div className="times">
              {timeUntilStart.days}d {timeUntilStart.hours}h {timeUntilStart.minutes}m {timeUntilStart.seconds}s
            </div>
          </div>
        )}
        <div>
          Prestake available!
          <div>Pool duration: {duration / 86400} days </div>
        </div>
      </div>
    );
  }
  if (poolEndTimerReady) {
    return (
      <div className="time-remaining">
        <div className="pool-time-remaining">
          <div className="times">
            <span role="img" aria-label="clock">
              ⏰
            </span>
            <span>
              {timeUntilEnd!.days}d {timeUntilEnd!.hours}h {timeUntilEnd!.minutes}m {timeUntilEnd!.seconds}s{" "}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return <div className="time-remaining">Oh no, error!</div>;
}

export default observer(Timer);
