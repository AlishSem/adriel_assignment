import { Tooltip } from 'react-tooltip'
import { useSelector } from 'react-redux';


const TooltipComponent = () => {
    const tooltipPlacement = useSelector((state) => state.tooltip.placement); 
    const timestamp = useSelector((state) => state.clock.time);
    const time = new Date(timestamp); 

    return (
        <Tooltip
        anchorSelect="#clock"
        id="my-tooltip"
        place={tooltipPlacement}>
            <div>
                <p>Current Time:</p>
                <p>{time.toLocaleTimeString()}</p>
            </div>
        </Tooltip>
    )
}

export default TooltipComponent