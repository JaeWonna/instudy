import {
    Box,
    Button,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardMedia, Grid,
    IconButton,
    Modal,
    Stack,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {Close} from "@mui/icons-material";
import React from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import react from '../../img/react.png';

const GroupCard = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);

        axios.post('/joingroup', {
            groupName: group.groupName,
            userId: loginUser.userId
        }).then((response) => {
            console.log(response.data)
            if (response.data.success === true) {
                window.location.reload()
            }
        }).catch(function (error) {
            console.log(error);
        });

        handleGroupSelection(group.id);
    }
    const handleClose = () => setOpen(false);

    const { group, loginUser, classes } = props;

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

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        // groups 데이터를 가져오는 비동기 함수를 호출합니다.
        // 아래의 예시에서는 getGroups 함수가 비동기 함수라고 가정합니다.
        const getGroups = async () => {
            try {
                const response = await axios.get('/groups');
                setGroups(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getGroups();
    }, []);

    const findGroupById = (id) => {
        return groups.find((group) => group.id === id);
    };

    const handleGroupSelection = (id) => {
        const group = findGroupById(id);
        setSelectedGroup(group);
    };

    return (
        <Grid item xs={12} sm={4} className={classes.item}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={react}
                        alt="react"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            <Link to={`/group/${group.groupId}`} key={group.groupId}>
                                {group.groupName}
                            </Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" onClick={handleOpen}>가입하기</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <h2 id="modal-modal-title">가입되었습니다</h2>
                                        <IconButton onClick={handleClose}>
                                            <Close />
                                        </IconButton>
                                        {/*<BasicModal />*/}
                                    </Box>
                                </Modal>
                            </Stack>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>
        </Grid>

    );
};

export default GroupCard;