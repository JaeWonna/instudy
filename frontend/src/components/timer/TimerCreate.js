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
    const { handleModalClose, modalOpen, userId, loginUser } = props;

    // const transformRequest = (data) => {
    //     // Circular Structure를 제거하거나 필요한 정보만 포함한 객체로 변환
    //     const transformedData = {
    //         userId: data.userId,
    //         // ...
    //     };
    //
    //     return JSON.stringify(transformedData);
    // };

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
            userId: userId,
        };

        console.log(newTimerData)

        axios.post('/timer/start', newTimerData, {
            userId: userId, // 커스텀 변환 함수 지정
        })
            .then(response => {
                if(response.data == "start") {
                    alert("타이머 시작 완료");
                }
            })
            .catch(error => {
                console.error('Error occurred while starting the timer', error);
            });
    };

    const stopTimer = () => {
        setIsRunning(false);

        const newTimerData = {
            userId: userId,
        };

        axios.post('/timer/stop', newTimerData)
            .then(response => {
                if(response.data == "stop") {
                    alert("타이머 멈춤");
                }
            })
            .catch(error => {
                console.error('Error occurred while stopping the timer', error);
            });
    };

    const saveTimer = (loginUser) => {
        console.log("userId", userId)
        const newTimerData = {
            userId: loginUser.userId,
        };

        axios.post('/timer/save', newTimerData)
            .then(response => {
                if(response.data == "save") {
                    alert("타이머 저장 완료");
                }
            })
            .catch(error => {
                console.error('Error occurred while saving the timer', error);
            });
    };

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
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
                    <div>
                    <Button onClick={handleModalClose}>닫기</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
