import React, { useEffect, useState } from "react";
import axios from "axios";
import {Container, Grid, Paper, Typography} from "@material-ui/core";
import groupMember from '../../../img/groupMember.jpg';
import groupMember2 from '../../../img/groupMember2.JPG';
import groupMember3 from '../../../img/groupMember3.png';
import groupMember4 from '../../../img/groupMember4.jpg';
import CheckUserItem from "./CheckUserItem";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';

const GroupUserList = (props) => {
    const [groupUsers, setGroupUsers] = useState([]);

    const { groupId, setClickedNum, clickedNum, setDetail } = props;

    useEffect(() => {
        const fetchGroupUsers = async () => {
            try {
                const response = await axios.post(`/checking/read/groupUser`, {
                    groupId: groupId,
                });
                console.log("response.data", response.data);
                setGroupUsers(response.data);
            } catch (error) {
                console.error("Error fetching group users:", error);
            }
        };

        fetchGroupUsers();
    }, [groupId]);

    const imgData = [
        { id: '1', img: groupMember },
        { id: '2', img: groupMember2 },
        { id: '3', img: groupMember3 },
        { id: '4', img: groupMember4 },
    ];

    const [users, setUsers] = useState([]);

    const readMemberRequest = async () => {
        const url = '/checking/read/groupUser';

        const readMemberData = {
            groupId: groupId,
        };

        try {
            const response = await axios.post(url, readMemberData);
            const users = response.data;
            console.log('group user list에서:', users);
            setUsers(users);
            // 요청 성공 후 처리할 작업 수행
        } catch (error) {
            if (error.response) {
                // 서버 응답이 왔지만 응답 상태 코드가 에러인 경우
                console.error('Error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                // 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 오류 등)
                console.error('Error:', error.request);
            } else {
                // 요청 설정을 준비하는 동안 발생한 오류
                console.error('Error:', error.message);
            }
            // 요청 실패 시 처리할 작업 수행
        }
    };

    const readMember = async () => {
        try {
            // 함수 호출
            await readMemberRequest();
            console.log("checkingId", users)
            // setCheckingId(readCheckingData.checkingId);
            // 요청 성공 후 처리할 작업 수행
        } catch (error) {
            console.error('Error:', error);
            // 요청 실패 시 처리할 작업 수행
        }
    };

    readMember();

    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {imgData.map(member => (
                    <CheckUserItem
                        key={member.id}
                        member={member}
                        setClickedNum={setClickedNum}
                        clickedNum={clickedNum}
                        setDetail={setDetail}
                    />
                ))}
            </div>
                {/*<Container maxWidth="xl">*/}
                {/*    <Box sx={{ padding: "0 50px" }}>*/}

                {/*{users.map((member, index) => (*/}
                {/*    <Grid item xs={3}>*/}
                {/*    <div key={index}>{member && member.userId}</div>*/}
                {/*    </Grid>*/}
                {/*))}*/}

                {/*    </Box>*/}
                {/*</Container>*/}

            <Grid container spacing={2} columns={16}>
                {users.map((member, index) => (
                    <Grid item xs={4}>
                        <div key={index}>{member && member.userId}</div>
                    </Grid>
                ))}
            </Grid>


        </div>
    );
};

export default GroupUserList;
