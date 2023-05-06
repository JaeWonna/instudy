import profile from '../img/profile.png';
import ProfileGroupView from '../views/ProfileGroupView';
import { Container } from 'react-bootstrap';
import Todo from  '../components/Profile/Todo'
import MyCalendar from '../components/Profile/MyCalendar'
import "react-datepicker/dist/react-datepicker.css";
import * as React from 'react';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
} from 'mdb-react-ui-kit';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

export default function Feed() {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();
    useEffect(()=> {
        const storedUser = sessionStorage.getItem("loginUser");
        console.log("test");
        console.log(storedUser);
        if (storedUser) { // 세션에 로그인한 유저가 저장되었을 때
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
        } else { // 세션에 저장된 유저가 null일 때 로그인 페이지로 이동
            navigate("/signIn");
        }
    }, []);

    return (
        <>
        {/*<div>프로필 페이지입니다</div>*/}
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src={profile} className="img-thumbnail" alt="..."/>
                            {/*<img id="hz" src="../img/profile.png" alt="랜덤짤" width="304" height="228"/>*/}
                            <h5 className="my-3">{loginUser.user_name}</h5>
                            <p className="text-muted mb-1">Full Stack Developer</p>
                            <p className="text-muted mb-4">{loginUser.email}</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <MyCalendar/>
                            </LocalizationProvider>
                            <div className="d-flex justify-content-center mb-2">
                                <button type="button" className="btn btn-primary">Follow</button>
                                <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card">
                        가입한 스터디 그룹(정렬 필요)
                        <div className="card-body">
                            <Container>
                                <ProfileGroupView />
                            </Container>
                        </div>
                    </div>

                    {/*todolist*/}
                    <MDBCard className="mt-4">
                        <MDBCardBody>
                            <MDBCardTitle><h4 className="text-center my-3 pb-3">To Do App</h4></MDBCardTitle>
                            <Todo/>
                        </MDBCardBody>
                    </MDBCard>
                </div>
            </div>
        </>
    );
}