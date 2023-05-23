import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { Button, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TimerCreate(props) {
    const { handleClose, modalOpen, userId } = props;

    console.log('dd');

    const transformRequest = (data) => {
        // Circular Structure를 제거하거나 필요한 정보만 포함한 객체로 변환
        const transformedData = {
            userId: data.userId,
            // ...
        };

        return JSON.stringify(transformedData);
    };

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
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        타이머 만들기
                    </Typography>
                    <Typography variant="h3" gutterBottom>{time} seconds</Typography>
                    <Button variant="contained" color="inherit" onClick={startTimer}>Start</Button>
                    <Button variant="contained" color="error" onClick={stopTimer}>Stop</Button>
                    <Button variant="contained" color="primary" onClick={saveTimer}>Save</Button>
                </Box>
            </Modal>
        </div>
    );
}
