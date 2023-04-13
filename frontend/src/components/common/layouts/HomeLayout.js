import {Container, Row, Col} from 'react-bootstrap';
import HomeCard from "../../Home/HomeCard";
import React, { useState, useEffect } from "react";
import SignIn from '../../../containers/sign/sign_in/SignIn';

function HomeLayout() {
    const [menu, setMenu] = useState([]);

    useEffect(()=> {
        const menudata = [
            {title: "그룹", link: "/group"},
            {title: "프로필", link: "/profile"}
        ];

        setMenu([...menudata]);

        console.log(menu);
    }, []);

    return (
        <>
        <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
        <div class="card">
  <div class="card-body">
    <h5 class="card-title">로그인</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <SignIn />
  </div>
</div>
        </div>
        <div class="col-md-3"></div>
</div>
        

            {/* <Row>
                    <h2>메뉴</h2>
                <hr/>
                        {
                            menu.map((menu) => (
                                <Col><HomeCard menu={menu}/></Col>
                            ))
                        }

            </Row> */}

            </>
        
    )
}

export default HomeLayout;