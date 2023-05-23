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
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import TimerDialog from "../components/timer/TimerDialog";

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

export default function SimpleDialogDemo() {
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

    return (
            <TimerDialog
                selectedValue={selectedValue}
                // open={open}
                onClose={handleClose}
                userId={userId}
            />
    );
}
