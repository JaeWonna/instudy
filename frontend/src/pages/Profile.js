import profile from '../img/profile.png';
import ProfileGroupView from '../views/ProfileGroupView';
import { Container } from 'react-bootstrap';
import Todo from  '../components/Profile/Todo'

import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
} from 'mdb-react-ui-kit';
import {useEffect} from "react";
import axios from "axios";


export default function Feed() {

    useEffect(()=> {
        axios
            .post("/profile", {
                user_id: sessionStorage.getItem("user_id")
            })
            .then((res) => {
                console.log(res);
            })
            .catch();
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
                            <h5 className="my-3">John Smith</h5>
                            <p className="text-muted mb-1">Full Stack Developer</p>
                            <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
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