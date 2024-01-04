import React, { useEffect, useRef } from 'react';
import '../Clock.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateTime } from '../reducers/clockReducer';
import { updatePlacement } from '../reducers/tooltipReducer';
import TooltipComponent from './TooltipComponent';

const Clock = () => {

  const dispatch = useDispatch();
  const clockFaceRef = useRef();
  const timestamp = useSelector((state) => state.clock.time);
  const time = new Date(timestamp); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date().getTime();
      dispatch(updateTime(newTime));
    }, 1000);
     
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    // event listener for mouse movement on the clock face
    const clockFace = clockFaceRef.current;
    clockFace.addEventListener('mousemove', handleMouseMove);

    return () => {
      clockFace.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  
  const handleMouseMove = (event) => {
    const clockFace = clockFaceRef.current;
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


  return (
    <>
        <div className="clock-face" ref={clockFaceRef} id='clock' data-tooltip-id="my-tooltip">
            <div
            className="hand hour-hand"
            style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)` }}></div>
            <div className="hand minute-hand" style={{ transform: `rotate(${time.getMinutes() * 6}deg)` }}></div>
            {time.getSeconds() >= 0 && (
            <div className="hand second-hand" style={{ transform: `rotate(${time.getSeconds() * 6}deg)` }}></div>
            )}
        </div>
        <TooltipComponent/>
    </>
  );
};

export default Clock;
