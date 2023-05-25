import { useState, useRef, useEffect } from 'react';

export const useProgressiveIncrementorHook = (props: { displayProgress: boolean; callBack: (x: boolean) => void }) => {
  const previousTimeStamp = useRef<number>(0);
  const tick = useRef<number>(0);
  let reqFrameIterator: number;
  const [timerVal, setTimerVal] = useState(0);
  const timerConfig = {
    // to increase 5% at regular frequency
    frequency: (Number(process.env.REACT_APP_ORG_SUCCESS_DELAY_TIME) || 1000) / 20,
    stopAt: Number(process.env.REACT_APP_ORG_SUCCESS_DELAY_TIME) || 1000, // milli Seconds
    currentStop: Number(process.env.REACT_APP_ORG_SUCCESS_DELAY_TIME)
  };

  function timer(timestamp: number) {
    if (previousTimeStamp.current === 0) {
      previousTimeStamp.current = timestamp;
      timerConfig.currentStop += timestamp + timerConfig.frequency;
    }
    const seconds = timerConfig.frequency;
    tick.current = timestamp - previousTimeStamp.current;

    function trigger() {
      const stopAtByFrequency = timerConfig.stopAt / timerConfig.frequency;
      setTimerVal((prev) => prev + 100 / stopAtByFrequency);
    }
    if (tick.current >= seconds) {
      trigger();
      previousTimeStamp.current = timestamp; // Updating the Timer each 500 milli second
    }
    if (timestamp < timerConfig.currentStop) {
      reqFrameIterator = requestAnimationFrame(timer);
    } else {
      props.callBack(true);
    }
  }
  useEffect(() => {
    let reqFrameInitiator: number;
    if (props.displayProgress) {
      previousTimeStamp.current = 0;
      setTimerVal(0);
      reqFrameInitiator = requestAnimationFrame(timer);
    }
    return () => {
      cancelAnimationFrame(reqFrameInitiator);
      cancelAnimationFrame(reqFrameIterator);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.displayProgress]);

  return timerVal;
};
