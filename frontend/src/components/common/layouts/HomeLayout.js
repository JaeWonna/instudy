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
        <div>메인 페이지입니다</div>
        <SignIn />

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