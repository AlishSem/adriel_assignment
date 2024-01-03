import React, { useEffect } from 'react';
import './Clock.css';
import { Tooltip } from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux';
import { updateTime } from './reducers/clockReducer';
import { updatePlacement } from './reducers/tooltipReducer';


const Clock = () => {

  const dispatch = useDispatch();
  const timestamp = useSelector((state) => state.clock.time);
  const time = new Date(timestamp); 
  const tooltipPlacement = useSelector((state) => state.tooltip.placement); 


  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date().getTime();
      dispatch(updateTime(newTime));
    }, 1000);
     
    return () => clearInterval(intervalId);
  }, [dispatch]);


  const handleMouseMove = (event) => {
    const clockFace = document.querySelector('.clock-face');
    const rect = clockFace.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
  
    const horizontalThird = rect.width / 3;
    const verticalThird = rect.height / 3;
  
    if (mouseX < horizontalThird) {
        dispatch(updatePlacement(mouseY < verticalThird ? 'left-start' : mouseY > (2 * verticalThird) ? 'left-end' : 'left'))
    } 
    else if (mouseX > 2 * horizontalThird) {
        dispatch(updatePlacement(mouseY < verticalThird ? 'right-start' : mouseY > (2 * verticalThird) ? 'right-end' : 'right'))
    } 
    else {
        dispatch(updatePlacement(mouseY < verticalThird
            ? 'top'
            : mouseY > 2 * verticalThird
            ? 'bottom'
            : mouseX < rect.width / 2
            ? 'left'
            : 'right'))
    }
  };


  useEffect(() => {
    // event listener for mouse movement on the clock face
    const clockFace = document.querySelector('.clock-face');
    clockFace.addEventListener('mousemove', handleMouseMove);

    return () => {
      clockFace.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


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
            <div>
                <p>Current Time:</p>
                <p>{time.toLocaleTimeString()}</p>
            </div>
        </Tooltip>
    </>
  );
};

export default Clock;
