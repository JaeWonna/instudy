import { useState, useEffect } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import groupMember from '../img/groupMember.jpg';
import { Link } from "react-router-dom";
import GroupCreateModal from "../components/group/GroupCreateModal";
import '../css/Group.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// import { useSelector } from "react-redux";
import { selectUser } from "../api/redux/user/userSlice";
import { Box, Button, Stack, Typography, Modal, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import React from 'react';

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

const Group = () => {
    const [group, setGroup] = useState([]);
    const [loginUser, setLoginUser] = useState({});
    useEffect(()=> {
        const groupdata = [
            {id: 1, content: '정보처리기사 필기 스터디', link: '/GroupMainView/1'},
            {id: 2, content: '스프링 스터디', link: '/GroupMainView/2'},
            {id: 3, content: '리액트 스터디', link: '/GroupMainView/3'},
        ];

        setGroup([...groupdata]);

        const storedUser = sessionStorage.getItem("loginUser");
        if (storedUser) { // 세션에 로그인한 유저가 저장되었을 때
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
        } else { // 세션에 저장된 유저가 null일 때

        }
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

    const imgStyle = {
        width: '70px',
    }

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    }

    const navigate = useNavigate();

    // const userInfo = useSelector(selectUser);

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
    }
    const handleClose = () => setOpen(false);


    return (
        <>
            <Container>
                {
                    group.map(group => (
                        <>
                            {/* <Container> */}
                            <Stack direction="row" spacing={2}>
                            <Link to={`/group/${group.groupId}`} key={group.groupId}>
                                {group.groupName}
                            </Link>
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

                            <hr/>
                            {/* </Container> */}
                        </>
                    ))
                }
                <div class="row">
                    <div class="col-md-12 col-lg-6"></div>

                    <div class="d-flex justify-content-end align-items-end">

                        <GroupCreateModal manager={loginUser.user_name} />

                    </div>
                </div>

            </Container>

            {/* <button type="button" class="btn btn-primary btn-floating btn-lg" onClick={showModal}>
  <i class="fab fa-airbnb fa-lg pe-none"></i>
</button>
{modalOpen &&  */}


        </>
    )


};

export default Group;