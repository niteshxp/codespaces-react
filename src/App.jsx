import './App.css';

import React, { useState, useEffect } from 'react';

const App = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (timerActive && (minutes > 0 || seconds > 0)) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }, 1000);
        } else if (minutes === 0 && seconds === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerActive, seconds, minutes]);

    const handleStart = () => {
        setTimerActive(true);
    };

    return (
        <div>
            <input 
                id="minutes" 
                type="number" 
                placeholder="Minutes" 
                value={minutes} 
                onChange={(e) => setMinutes(Math.max(0, e.target.value))}
                onInput={(e) => setMinutes(Math.max(0, e.target.value))}
                disabled={timerActive}
            />
            <input 
                id="seconds" 
                type="number" 
                placeholder="Seconds" 
                value={seconds} 
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, e.target.value)))}
                onInput={(e) => setSeconds(Math.max(0, Math.min(59, e.target.value)))}
                disabled={timerActive}
            />
            <button id="start" onClick={handleStart} disabled={timerActive}>
                Start
            </button>
            <div id="display">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
        </div>
    );
};

export default App;
