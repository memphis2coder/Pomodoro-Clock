import React from 'react';
import moment from 'moment';

const Sessions = (props) => {
    // const are from App.js passed into sessions using props
    const {
        sessionLength,
        decrementSessionLengthByOneMinute,
        incrementSessionLengthByOneMinute,
    } = props;

    // change seconds to minutes
    const sessionLengthInMinutes = moment.duration(sessionLength, 's').minutes();
    
    return (
        <div>
            <p id="sessions-label">Session Length</p>
            <p id="sessions-length">{sessionLengthInMinutes}</p>
            <button id="sessions-decrement" onClick={decrementSessionLengthByOneMinute}>
                -
            </button>
            <button id="sessions-increment" onClick={incrementSessionLengthByOneMinute}>
                +
            </button>
        </div>
    )
};

export default Sessions;

