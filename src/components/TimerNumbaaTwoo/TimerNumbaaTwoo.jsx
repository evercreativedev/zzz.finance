import { getTimeRemaining } from "helpers/time";
import React, { useEffect, useState, memo } from "react";
import Loader from "react-loader-spinner";
import "./TimerNumbaaTwoo.scss";

function TimerNumbaaTwoo({ date, endTime = false }) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timerFinished, setTimerFinished] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(date);
      setTimeRemaining(remaining);
      if (remaining && remaining.seconds < 0) {
        clearInterval(interval);
        setTimerFinished(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [date, timerFinished]);

  if (!timeRemaining) return <Loader type="ThreeDots" width={25} height={25} color="rgb(11, 219, 39)" />;
  return (
    <div className="timer-vault">
      {timeRemaining.seconds >= 0 ? (
        <span className="time-remaining-vault">
          {"⏱ TIMELOCK REMAINING:"} <b>{timeRemaining.days}</b>d <b>{timeRemaining.hours}</b>h <b>{timeRemaining.minutes}</b>m{" "}
          <b>{timeRemaining.seconds}</b>s
        </span>
      ) : (
        <span className="time-remaining">Lock</span>
      )}
    </div>
  );
}

export default memo(TimerNumbaaTwoo);
