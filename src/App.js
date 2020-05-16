import React, { useState, useEffect, useRef } from "react";
import Break from "./components/Break";
import Sessions from "./components/Sessions";
import TimeLeft from "./components/TimeLeft";
import "./App.css";

function App() {
  // ref to audio
  const audioElement = useRef(null);
  // set state for sessions.js
  const [sessionLength, setSessionLength] = useState(60 * 25);
  // set state for break.js
  const [breakLength, setBreakLength] = useState(300);
  // setstate for timeleft.js
  const [currentSessionType, setCurrentSessionType] = useState('Session'); // 'sessions' or 'break'
  const [intervalId, setIntervalId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  // change timeleft when sessionsLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  ////////////////// Sessions.js functions ////////////////////////////
  // increase sessions
  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength > 0) {
      setSessionLength(sessionLength + 60);
    }
  };

  // decrement sessions
  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };

  ////////////////// Break.js functions ////////////////////////////
  // function to add 60 seconds
  const increase = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    }
  };

  // function to subtract 60 seconds
  const decrease = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };

  ////////////////// Timeleft.js functions ////////////////////////////
  // clock has started if intervalId is not equal to null
  const isStarted = intervalId != null;

  // handle start and stop
  const handleStartStopClick = () => {
      if (isStarted) {
          // if we are in started mode:
          // we want to stop timer
          // to do this we'll use clearInterval
          clearInterval(intervalId);
          setIntervalId(null);
      } else {
          // if we are in stopped mode:
          // decrement timeleft by every one second (1000ms)
          // to do this we'll use setInterval
          const newIntervalId = setInterval(() => {
              setTimeLeft((prevTimeLeft) => {
                  const newTimeLeft = prevTimeLeft - 1;
                  if (newTimeLeft >= 0) {
                      return newTimeLeft;
                  } 
                  // time left is less than zero
                  audioElement.current.play()
                      // if session:
                  if (currentSessionType === "Session") {
                      // switch to break
                      setCurrentSessionType('Break');
                      // setTimeLeft to breakSessionLength
                      return breakLength;
                  }
                      // if break:
                  else if (currentSessionType === "Break") {   
                      // switch to sessions
                      setCurrentSessionType('Session');
                      //setTimeLeft to sessionsLength
                      return sessionLength;
                  }
              });
          }, 1000);
          setIntervalId(newIntervalId);
      }
  };

  // handle reset button click
  const handleResetButtonClick = () => {
    // reset the audio
    audioElement.current.load()
    // clear the timeout interval
    clearInterval(intervalId);
    // set the intervalId null
    setIntervalId(null);
    // set the sessionType to 'Session'
    setCurrentSessionType('Session');
    // reset the session length to 25 min
    setSessionLength(60 * 25);
    // reset break length to 5 min
    setBreakLength(60 * 5);
    // reset the timer to 25 minutes (initial session length)
    setTimeLeft(60 * 25);
  }

  return (
    <div className="App">

    <h1>Pomodoro Clock</h1>

    <div className="controls">
      <Break 
        breakLength={breakLength}
        increase={increase}
        decrease={decrease}
      />
      <Sessions
        sessionLength={sessionLength}
        incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
        decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
      />
    </div>

    <div className="time">
      <TimeLeft 
        breakLength={breakLength}
        handleStartStopClick={handleStartStopClick}
        timerLabel={currentSessionType}
        sessionLength={sessionLength}
        startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
        timeLeft={timeLeft}
        />
    </div>  

      <button  id="reset" onClick={handleResetButtonClick}>
        Reset
      </button>

      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg" />
      </audio>

    </div>
  );
}

export default App;
