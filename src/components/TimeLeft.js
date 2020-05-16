import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

// setup momentDurationFormatSetup
momentDurationFormatSetup(moment);

function TimeLeft(props) {
    // props sent from app.js
    const {
        handleStartStopClick,  
        startStopButtonLabel, 
        timerLabel,
        timeLeft
    } = props;
    
    // convert length to minutes and sesconds
    const formattedTimeLeft = moment.duration(timeLeft, "s").format("mm:ss", { trim: false });

    return (
        <div>
            <p id="timer-label">{timerLabel}</p>
            <p id='time-left'>{formattedTimeLeft}</p>
            <button onClick={handleStartStopClick}>
                {startStopButtonLabel}
            </button>
        </div>
    );
}

export default TimeLeft;
