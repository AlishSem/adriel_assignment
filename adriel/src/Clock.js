// Clock.js

import React, { useState, useEffect } from 'react';
import './Clock.css';
import { Tooltip } from 'react-tooltip'

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const tooltipContent = (
    <div>
      <p>Current Time:</p>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );
  return (
      <div className="clock-face" data-tooltip-id="clockTooltip">
        {/* Hour Hand */}
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)` }}
        ></div>

        {/* Minute Hand */}
        <div className="hand minute-hand" style={{ transform: `rotate(${time.getMinutes() * 6}deg)` }}></div>

        {/* Second Hand */}
        {time.getSeconds() > 0 && (
          <div className="hand second-hand" style={{ transform: `rotate(${time.getSeconds() * 6}deg)` }}></div>
        )}
        <Tooltip
        place='right-start'
        effect="solid"
        className="tooltip"
        id="clockTooltip"
        type="light"
        border
        multiline
        isCapture // Ensure capturing the mouse events
      >
        <div>
          <p>Current Time:</p>
          <p>{time.toLocaleTimeString()}</p>
        </div>
      </Tooltip>
      </div>
  );
};

export default Clock;
