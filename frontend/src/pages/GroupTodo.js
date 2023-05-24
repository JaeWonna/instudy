import { MDBCard, MDBCardBody, MDBCardTitle } from "mdb-react-ui-kit";
import * as React from "react";
import { useParams } from "react-router-dom";
import groupMember from '../img/groupMember.jpg';
import TodoList from "../components/Profile/TodoList";
import { useState, useEffect } from "react";
import axios from "axios";
import {Typography} from "@mui/material";

export default function GroupTodo() {
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

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.post("/todo/read", {
                    userId: loginUser.userId
                });
                setTodos(response.data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };

        const storedUser = sessionStorage.getItem("loginUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
            fetchTodos();
        }
    }, []);

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
                        <MDBCardTitle>
                            <div className="flex-shrink-0">
                                <img src={groupMember} alt="Generic placeholder"
                                     className="img-fluid rounded-circle border border-dark border-3" style={imgStyle} />
                            </div>
                        </MDBCardTitle>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <div className="col-md-10" style={child}>
                <TodoList todos={todos} onDelete={onDelete} finishedClick={finishedClick}/>
            </div>
        </div>
    );
}
