import React, { useState, useEffect } from 'react';
import './StopWatch.css';

function StopWatch() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = ('00' + Math.floor(totalSeconds / 3600)).slice(-2);
    const minutes = ('00' + Math.floor((totalSeconds % 3600) / 60)).slice(-2);
    const seconds = ('00' + (totalSeconds % 60)).slice(-2);
    const formattedMilliseconds = ('000' + (milliseconds % 1000)).slice(-3);
    return `${hours}:${minutes}:${seconds}.${formattedMilliseconds}`;
};



  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(0);
  };

  return (
    <div className="stopwatch">
      <h1 className='name'>STOP WATCH</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={handleStart} disabled={isActive}>
          Start
        </button>
        <button onClick={handlePauseResume}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={handleReset}>Reset</button>
        
      </div>
    </div>
  );
}

export default StopWatch;
