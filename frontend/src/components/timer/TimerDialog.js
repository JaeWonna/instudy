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
import {MDBCard, MDBCardBody} from "mdb-react-ui-kit";
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/timer/read', { userId: loginUser.userId });
                setLoginUser(response.data);
            } catch (error) {
                console.error('Error fetching user time:', error);
            }
        };

        fetchData();
    }, []);

    console.log("loginUser", loginUser)

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
            <Typography>{userId}님의 타이머</Typography>
            <List sx={{ pt: 0 }}>
                <ListItem disableGutters>

                    <MDBCard className="mb-5">
                            <Typography variant="h5" gutterBottom>
                                {time} second
                            </Typography>
                    </MDBCard>
                </ListItem>

                <Typography>총 공부한 시간</Typography>
                <ListItem disableGutters>
                    <MDBCard className="mb-5">
                        <Typography variant="h5" gutterBottom>
                            {loginUser.userStudyHours} : {loginUser.userStudyMinutes} : {loginUser.userStudySeconds}
                        </Typography>
                    </MDBCard>
                </ListItem>

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
                    <TimerCreate modalOpen={modalOpen} handleModalClose={handleModalClose} userId={userId} loginUser={loginUser} timerId={timerId} time={time} setTime={setTime}/>
                </ListItem>
            </List>
                </CardContent>
            </Card>
        </Box>

    );
}