import React from 'react'
import moment from 'moment';

function Break(props) {
    // const are from App.js passed into sessions using props
    const {
        breakLength,
        increase,
        decrease,
    } = props;

    // moments.js change seconds to minutes
    const breakLengthInMintues = moment.duration(breakLength, "s").asMinutes();

    return (
        <div>
            <p id="break-label">Break</p>
            <p id="break-length">{breakLengthInMintues}</p>
            <button onClick={decrease}>
                -
            </button>
            <button onClick={increase}>
                +
            </button>
        </div>
    );
};

export default Break;
