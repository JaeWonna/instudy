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

export default function TimerDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open, userId } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const createTimer = (userId) => {
        const url = '/timer/create';
        const data = {
            userId: userId.toString()
        };

        console.log(userId)

        axios.post(url, data)
            .then(response => {
                alert("타이머 생성 완료");
            })
            .catch(error => {
                alert("타이머 생성 실패");
            });
    };

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleOpen = () => setModalOpen(true);

    const handleListItemClick = (value: string) => {
        onClose(value);
        createTimer(userId);
        handleOpen();
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
            <Typography>{userId}님의 타이머</Typography>
            <List sx={{ pt: 0 }}>
                {/*{emails.map((email) => (*/}
                {/*    <ListItem disableGutters>*/}
                {/*        <ListItemButton onClick={() => handleListItemClick(email)} key={email}>*/}
                {/*            <ListItemAvatar>*/}
                {/*                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>*/}
                {/*                    <PersonIcon />*/}
                {/*                </Avatar>*/}
                {/*            </ListItemAvatar>*/}
                {/*            <ListItemText primary={email} />*/}
                {/*        </ListItemButton>*/}
                {/*    </ListItem>*/}
                {/*))}*/}
                <ListItem disableGutters>
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
                    <TimerCreate modalOpen={modalOpen} handleClose={handleClose} userId={userId}/>
                </ListItem>
            </List>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>

    );
}