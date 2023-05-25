import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import groupMember from '../img/groupMember.jpg';
import TodoList from "../components/Profile/TodoList";
import { useState, useEffect } from "react";
import axios from "axios";
import {Typography} from "@mui/material";
import GroupUserList from "../components/group/Check/GroupUserList";
import CheckTodoList from "../components/group/Check/CheckTodoList";

export default function Check() {
    const child = {
        margin: "0 auto"
    };

    const imgStyle = {
        width: '70px',
    };

    const params = useParams();
    const groupId = params.groupId;
    console.log("groupId ", groupId);

    const [todos, setTodos] = useState([]);
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("loginUser");
        console.log("test");
        console.log("storedUser", storedUser);
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
        } else {
            navigate("/signIn");
        }
    }, []);

    useEffect(() => {
        if (loginUser.userId) {
            console.log("투두 읽는 useEffect");
            axios
                .post("/checking/read/todo", {
                    userId: loginUser.userId
                })
                .then((response) => {
                    const todoData = response.data; // 투두 데이터
                    console.log("투두 response", todoData);
                    setTodos(todoData);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [loginUser]);

    console.log("todos", todos)

    const [group, setGroup] = useState([]);

    useEffect(()=> {
        const groupdata = [
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

    const onDelete = () => {

    }

    const finishedClick = () => {

    }

    return (
        <div>
            <Typography variant="h5" gutterBottom>{group.groupName}</Typography>
            <div className="col-md-10" style={child}>
                <MDBCard className="mb-5">
                    <MDBCardBody>
                        <GroupUserList loginUser={loginUser} groupId={groupId}/>
                        {/*<img src={groupMember} alt="Generic placeholder"*/}
                        {/*     className="img-fluid rounded-circle border border-dark border-3" style={imgStyle} />*/}
                    </MDBCardBody>
                </MDBCard>
            </div>
            <div className="col-md-10" style={child}>
<CheckTodoList todos={todos} />
            </div>
        </div>
    );
}
