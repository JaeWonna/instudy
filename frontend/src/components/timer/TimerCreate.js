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
    const { handleModalClose, modalOpen, userId, loginUser, timerId, time, setTime, setTimerList, timerList } = props;

    console.log("timercreate에서 timerList", timerList)

    // const transformRequest = (data) => {
    //     // Circular Structure를 제거하거나 필요한 정보만 포함한 객체로 변환
    //     const transformedData = {
    //         userId: data.userId,
    //         // ...
    //     };
    //
    //     return JSON.stringify(transformedData);
    // };
    //
    // const [time, setTime] = useState(0);

    useEffect(() => {
        // Retrieve the saved time from session storage when the component mounts
        const savedTime = sessionStorage.getItem('time');
        if (savedTime) {
            setTime(parseInt(savedTime));
        }
    }, []);

    console.log("timercreate에서 timerList", timerList)

    useEffect(() => {
        console.log("timercreate에서 timerList", timerList)
        // Save the time to session storage whenever it changes
        if (timerList && timerList.length > 1) {
            setTime(0);
        }
        else {
            sessionStorage.setItem('time', time.toString());
        }
    }, [time, timerList]);

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

    // useEffect(() => {
    //     // Retrieve the saved time from session storage when the component mounts
    //     const savedTime = sessionStorage.getItem('time');
    //     if (savedTime) {
    //         setTime(parseInt(savedTime));
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     // Save the time to session storage whenever it changes
    //     sessionStorage.setItem('time', time.toString());
    // }, [time]);

    const startTimer = (loginUser) => {
        setIsRunning(true);
        console.log("timerId", timerId)
        axios.post('/timer/start', {
            timerId: timerId, // 커스텀 변환 함수 지정
        })
            .then(response => {
                console.log("start에서 response", response.data)
                if(response.data == "start") {
                    alert("타이머 시작 완료");
                }
            })
            .catch(error => {
                console.error('Error occurred while starting the timer', error);
            });
    };

    const stopTimer = (timerId) => {
        setIsRunning(false);
        console.log("stop에서 timerId", timerId);

        axios
            .post('/timer/stop', {
                timerId: timerId,
            })
            .then((response) => {
                console.log("response.data", response.data)
                if (response.data === "stop") {
                    alert("타이머 멈춤");
                    setTimerList((prevTimerList) => [
                        ...prevTimerList,
                        {
                            timerId: timerId,
                            time: time,
                        }
                    ]);
                }
            })
            .catch((error) => {
                console.error('Error occurred while stopping the timer', error);
            });
    };

    const saveTimer = (timerId) => {
        console.log("userId", userId)
        console.log("save에서 timerId", timerId);

        axios
            .post('/timer/save', {
                timerId: timerId,
                userId: userId,
            })
            .then((response) => {
                console.log("response.data", response.data)
                if (response.data === "save") {
                    alert("타이머 저장 완료");
                    setTimerList((prevTimerList) => [
                        ...prevTimerList,
                        {
                            timerId: timerId,
                            time: time,
                        }
                    ]);
                }
            })
            .catch((error) => {
                console.error('Error occurred while stopping the timer', error);
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
                    <Button variant="contained" color="error" onClick={()=>{stopTimer(timerId)}}>Stop</Button>
                    <Button variant="contained" color="primary" onClick={()=>{saveTimer(timerId)}}>Save</Button>
                    <div>
                    <Button onClick={handleModalClose}>닫기</Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
