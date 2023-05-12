import { useState, useEffect } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import groupMember from '../img/groupMember.jpg';
import { Link } from "react-router-dom";
import GroupCreateModal from "../components/group/GroupCreateModal";
import '../css/Group.css';
import axios from "axios";
import {Stack, Button} from '@mui/material';

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
                                <Button variant="contained">가입하기</Button>
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