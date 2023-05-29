import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box } from "@mui/system";
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';
import TimerDialog from "../components/timer/TimerDialog";

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function SimpleDialogDemo(props) {
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

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(userId);

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const [group, setGroup] = useState([]);

    useEffect(()=> {
        const groupdata = [
            {id: 1, content: '정보처리기사 필기 스터디', link: '/GroupMainView/1'},
            {id: 2, content: '스프링 스터디', link: '/GroupMainView/2'},
            {id: 3, content: '리액트 스터디', link: '/GroupMainView/3'},
        ];

        setGroup([...groupdata]);

        axios
            .post("/groups", {
                loginUser: loginUser.user_name,
            })
            .then((res) => {
                console.log(res.data);
                setGroup(res.data);
                console.log("test");
                console.log(...group);
            })
            .catch();

    }, []);

    const params = useParams(); //url로 넘어온 파라미터를 받는 역할 (App.js 의 :id 참고)
    const groupId = params.groupId; //(params의 :id를 받는 역할)
    console.log("groupId ", groupId)

    const [time, setTime] = useState(0);

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

    return (
            <TimerDialog
                selectedValue={selectedValue}
                // open={open}
                onClose={handleClose}
                userId={userId} loginUser={loginUser} groupId={groupId} time={time} setTime={setTime} setLoginUser={setLoginUser}
            />
    );
}
