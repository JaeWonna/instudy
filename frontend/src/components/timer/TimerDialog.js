import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import ListItemText from "@mui/material/ListItemText";
import {SimpleDialogProps} from "../../pages/Timer";
import axios from "axios";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import TimerCreate from "./TimerCreate";
import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';
import {MDBCard, MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';
import CheckTodoList from "../group/Check/CheckTodoList";
import CheckCard from "../group/Check/CheckCard";
import CheckProgress from "../group/Check/CheckProgress";

export default function TimerDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open, userId, loginUser, groupId, time, setTime, setLoginUser } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const currentDate = new Date(); // 현재 날짜와 시간을 가져옵니다.

    // 날짜 및 시간 형식 지정
    const formattedTime = format(currentDate, 'HH:mm:ss');
    const formattedDateTime = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

    // ISO 문자열을 Date 객체로 변환
    const isoString = '2023-05-23T12:34:56.789Z';
    const parsedDate = parseISO(isoString);

    const [bitValue, setBitValue] = useState(0);

    const [timerId, setTimerId] = useState(0);

    const createTimer = () => {
        setTimerId(timerId + 1);
        console.log("userId " , userId)
        axios.post('/timer/create', {
            userId: userId.toString(),
            groupId: groupId,
        })
            .then(response => {
                console.log("여기까지")
                console.log("response.data", response.data)
                if(response.data == "create") {
                    alert("타이머 생성 완료");
                }
            })
            .catch(error => {
                alert("타이머 생성 실패");
            });
    };

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleListItemClick = (value: string) => {
        onClose(value);
        createTimer();
        handleOpen();
    };

    const handleTimerListClick = (timerId) => {
        setSelectedTimerId(timerId);
        createTimer();
        handleOpen();
    }

    console.log("userId type:", typeof userId);

    useEffect(() => {
        console.log("으ㅏㅇㄹ마이럼;나ㅣㅇ험ㅇ나ㅣ러userId", userId)
        axios.post('/timer/read', {
            userId: userId,
        })
            .then(
                (response) => {
                    console.log("타이머 읽어옴 response", response);
                    if (response.data) {
                        alert("타이머 읽어옴")
                    } else {
                        alert("타이머 읽어오기 실패")
                    }
                })
            .catch((error) => {
                // 서버 요청 실패
                console.error("서버 요청 타이머 읽어옴 실패: ", error);
                // 에러 처리 또는 알림 표시
            });
    }, [userId]);

    const [timerList, setTimerList] = useState([
        {
            timerId: timerId,
            time: time
        },
    ]);

    console.log("loginUser", loginUser)
    console.log("timerId", timerId)
    console.log("timerList", timerList)

    const navigate = useNavigate();

    const clickTimerItem = (timerId) => {
        return (
            <TimerCreate modalOpen={modalOpen} handleModalClose={handleModalClose} />
        )
    }

    const [selectedTimerId, setSelectedTimerId] = useState(null); // Add selectedTimerId state variable

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography variant="h5" component="h5" style={{ fontWeight: 'bold' }}>{userId}님의 타이머</Typography>
            <List sx={{ pt: 0 }}>
                {/*<ListItem disableGutters>*/}

                {/*    <MDBCard className="mb-5">*/}
                {/*            <Typography variant="h5" gutterBottom>*/}
                {/*                {time} second*/}
                {/*            </Typography>*/}
                {/*    </MDBCard>*/}
                {/*</ListItem>*/}
                {/*{*/}
                {
                    timerList.map((timer) => (
                        <ListItem disableGutters key={timer.timerId}>
                            <ListItemButton
                                autoFocus
                                onClick={() => handleTimerListClick(timer.timerId)}
                            >
                                <ListItemText primary={`${timer.time} second`} />
                            </ListItemButton>
                            {selectedTimerId === timer.timerId && (
                                <TimerCreate
                                    modalOpen={modalOpen}
                                    handleModalClose={handleModalClose}
                                    userId={userId}
                                    loginUser={loginUser}
                                    timerId={timer.timerId}
                                    time={timer.time}
                                    setTime={setTime}
                                    setTimerList={setTimerList}
                                />
                            )}
                        </ListItem>
                    ))
                }

                <Typography variant="h5" component="h5" style={{ fontWeight: 'bold' }}>총 공부한 시간</Typography>
                {/*<ListItem disableGutters>*/}
                {/*    <Box*/}
                {/*        display="flex"*/}
                {/*        justifyContent="center"*/}
                {/*        alignItems="center"*/}
                {/*        height="10vh"*/}
                {/*    >*/}
                <MDBCard className="col-md-10">
                    <MDBCardBody>
                        <MDBCardTitle>
                            <h1 className="text-center my-3 pb-3">
                                {loginUser.userStudyHours} : {loginUser.userStudyMinutes} : {loginUser.userStudySeconds}
                            </h1>
                        </MDBCardTitle>
                    </MDBCardBody>
                </MDBCard>

                    {/*</Box>*/}
                {/*</ListItem>*/}

                <ListItem disableGutters>
                    {/*{time}*/}
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick('addAccount')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="새 타이머 만들기" />
                    </ListItemButton>
                    <TimerCreate modalOpen={modalOpen} handleModalClose={handleModalClose} userId={userId} loginUser={loginUser} timerId={timerId} time={time} setTime={setTime} setTimerList={setTimerList}/>
                </ListItem>
            </List>
                </CardContent>
            </Card>
        </Box>

    );
}