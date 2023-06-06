import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import groupMember from '../img/groupMember.jpg';
import TodoList from "../components/Profile/TodoList";
import { useState, useEffect } from "react";
import axios from "axios";
import {Typography, Box} from "@mui/material";
import GroupUserList from "../components/group/Check/GroupUserList";
import CheckTodoList from "../components/group/Check/CheckTodoList";
import CheckUserDetails from "../components/group/Check/CheckUserDetails";
import CheckCard from "../components/group/Check/CheckCard";
import MemoView from "../components/group/Check/Comment/MemoView";
import CheckProgress from "../components/group/Check/CheckProgress";

export default function Check() {
    const child = {
        margin: "0 auto"
    };

    const imgStyle = {
        width: '70px',
    };

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

    const params = useParams();
    const groupId = params.groupId;

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        if (loginUser.userId) {
            axios
                .post("/checking/read/todo", {
                    userId: loginUser.userId
                })
                .then((response) => {
                    const todoData = response.data; // 투두 데이터
                    setTodos(todoData);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [loginUser]);

    const [group, setGroup] = useState([]);

    useEffect(()=> {
        axios
            .post("/groups", {
                loginUser: loginUser.user_name,
            })
            .then((res) => {
                setGroup(res.data);
            })
            .catch();

    }, []);

    const onDelete = () => {

    }

    const finishedClick = () => {

    }

    const [detail, setDetail] = useState(true);

    const [groupUsers, setGroupUsers] = useState([]);

    const [clickedNum, setClickedNum] = useState('');

    useEffect(() => {
        const fetchGroupUsers = async () => {
            try {
                const response = await axios.post(`/checking/read/groupUser`, {
                    groupId: groupId,
                });
                setGroupUsers(response.data);
            } catch (error) {
                console.error("Error fetching group users:", error);
            }
        };

        fetchGroupUsers();
    }, [groupId]);

    useEffect(() => {
        if (groupUsers.length > 0) {
            setClickedNum(groupUsers[0]?.user_name);
        }
    }, [groupUsers]);

    return (
        <div>
            <div className="col-md-10" style={child}>
                <MDBCard className="mb-5">
                    {/*<Box*/}
                    {/*    display="flex"*/}
                    {/*    justifyContent="center"*/}
                    {/*    alignItems="center"*/}
                    {/*    height="10vh"*/}
                    {/*>*/}
                    {/*    <Typography variant="h5" gutterBottom>*/}
                    {/*        {group.length > 0 && group[groupId]?.groupName}</Typography>*/}
                    {/*</Box>*/}
                    <MDBCardBody>
                        <GroupUserList loginUser={loginUser} groupId={groupId} clickedNum={clickedNum} setClickedNum={setClickedNum} setDetail={setDetail}/>
                        {/*<img src={groupMember} alt="Generic placeholder"*/}
                        {/*     className="img-fluid rounded-circle border border-dark border-3" style={imgStyle} />*/}
                    </MDBCardBody>
                </MDBCard>
            </div>
            <div className="col-md-10" style={child}>
{/*<CheckTodoList todos={todos} />*/}
                {
                    detail == true
                        ?
                        <CheckUserDetails loginUser={loginUser} clickedNum={clickedNum} todos={todos} groupId={groupId}/>
                        :
                        <></>

                }
            </div>

        </div>
    );
}
