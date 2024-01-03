import React, { useState, useEffect } from 'react';
import './Clock.css';
import { Tooltip } from 'react-tooltip'

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [tooltipPlacement, setTooltipPlacement] = useState('top'); // Initial placement

  const handleMouseMove = (event) => {
    const clockFace = document.querySelector('.clock-face');
    const rect = clockFace.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
  
    // Calculate placement based on mouse position
    const horizontalThird = rect.width / 3;
    const verticalThird = rect.height / 3;
  
    if (mouseX < horizontalThird) {
      setTooltipPlacement(
        mouseY < verticalThird ? 'left-start' : mouseY > (2 * verticalThird) ? 'left-end' : 'left'
      );
    } else if (mouseX > 2 * horizontalThird) {
      setTooltipPlacement(
        mouseY < verticalThird ? 'right-start' : mouseY > (2 * verticalThird) ? 'right-end' : 'right'
      );
    } else {
      setTooltipPlacement(
        mouseY < verticalThird
          ? 'top'
          : mouseY > 2 * verticalThird
          ? 'bottom'
          : mouseX < rect.width / 2
          ? 'left'
          : 'right'
      );
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Add event listener for mouse movement on the clock face
    const clockFace = document.querySelector('.clock-face');
    clockFace.addEventListener('mousemove', handleMouseMove);

    // Remove the event listener when the component unmounts
    return () => {
      clockFace.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Only run this effect once during component mount

  const tooltipContent = (
    <div>
      <p>Current Time:</p>
      <p>{time.toLocaleTimeString()}</p>
    </div>
  );

  return (
    <>
      <div className="clock-face" id='clock' data-tooltip-id="my-tooltip">
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)` }}></div>

        <div className="hand minute-hand" style={{ transform: `rotate(${time.getMinutes() * 6}deg)` }}></div>

        {time.getSeconds() >= 0 && (
          <div className="hand second-hand" style={{ transform: `rotate(${time.getSeconds() * 6}deg)` }}></div>
        )}

      </div>

      <Tooltip
        anchorSelect="#clock"
        id="my-tooltip"
        place={tooltipPlacement}>
            {tooltipContent}
        </Tooltip>
      </>
  );
};

export default Clock;
