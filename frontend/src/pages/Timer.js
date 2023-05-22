import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { Button, Typography } from '@mui/material';

function Stopwatch() {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=> {
        const storedUser = sessionStorage.getItem("loginUser");
        if (storedUser) { // 세션에 로그인한 유저가 저장되었을 때
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
        } else { // 세션에 저장된 유저가 null일 때 로그인 페이지로 이동
            navigate("/signIn");
        }
    }, []);

    const transformRequest = (data) => {
        // Circular Structure를 제거하거나 필요한 정보만 포함한 객체로 변환
        const transformedData = {
            userId: data.userId,
            // ...
        };

        return JSON.stringify(transformedData);
    };

    const userId = loginUser.userId;

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning]);

    const startTimer = (loginUser) => {
        setIsRunning(true);
        const newTimerData = {
            userId: loginUser.userId,
            user: {
                id: loginUser.userId, // 필요한 정보만 유지하고 Circular Structure를 제거
                name: loginUser.name
            }
        };

        axios.post('/timer/start', newTimerData, {
            transformRequest: [transformRequest] // 커스텀 변환 함수 지정
        })
            .then(response => {
                console.log(response.data); // 'start' from the Spring Boot controller
            })
            .catch(error => {
                console.error('Error occurred while starting the timer', error);
            });
    };

    const stopTimer = (loginUser) => {
        setIsRunning(false);

        const newTimerData = {
            userId: loginUser.userId,
            user: {
                id: loginUser.userId, // 필요한 정보만 유지하고 Circular Structure를 제거
                name: loginUser.name
            }
        };

        axios.post('/timer/stop', newTimerData)
            .then(response => {
                console.log(response.data); // 'stop' from the Spring Boot controller
            })
            .catch(error => {
                console.error('Error occurred while stopping the timer', error);
            });
    };

    const saveTimer = (loginUser) => {
        console.log("userId", userId)
        const newTimerData = {
            userId: loginUser.userId,
            user: {
                id: loginUser.userId, // 필요한 정보만 유지하고 Circular Structure를 제거
                name: loginUser.name
            }
        };

        axios.post('/timer/save', newTimerData)
            .then(response => {
                console.log(response.data); // 서버에서 반환한 데이터 처리
            })
            .catch(error => {
                console.error('Error occurred while saving the timer', error);
            });
    };

    return (
        <div>
            <Typography variant="h3" gutterBottom>{time} seconds</Typography>
            <Button variant="contained" color="inherit" onClick={startTimer}>Start</Button>
            <Button variant="contained" color="error" onClick={stopTimer}>Stop</Button>
            <Button variant="contained" color="primary" onClick={saveTimer}>Save</Button>
        </div>
    );
};

export default Stopwatch;
