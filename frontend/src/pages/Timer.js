import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;

        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isRunning]);

    const startStopwatch = () => {
        setIsRunning(true);

        axios.post('/timer/start')
            .then(response => {
                console.log(response.data); // 'start' from the Spring Boot controller
            })
            .catch(error => {
                console.error('Error occurred while starting the timer', error);
            });
    };

    const stopStopwatch = () => {
        setIsRunning(false);

        axios.post('/timer/stop')
            .then(response => {
                console.log(response.data); // 'stop' from the Spring Boot controller
            })
            .catch(error => {
                console.error('Error occurred while stopping the timer', error);
            });
    };

    const saveStopwatch = () => {
        axios.post('/timer/save')
            .then(response => {
                console.log(response.data); // 'save' from the Spring Boot controller
            })
            .catch(error => {
                console.error('Error occurred while saving the timer', error);
            });
    };

    return (
        <div>
            <h1>Stopwatch</h1>
            <div>{time} seconds</div>
            <button onClick={startStopwatch}>Start</button>
            <button onClick={stopStopwatch}>Stop</button>
            <button onClick={saveStopwatch}>Save</button>
        </div>
    );
}

export default Stopwatch;
