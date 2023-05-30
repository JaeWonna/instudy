import { Container, Row, Col, Card, Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCheckSquare, faCalendar, faClock, faRss } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {Link, useParams} from "react-router-dom";
import React from "react";

export default function GroupBottomNav() {
//     const textStyle = {
//         writingMode: 'horizontal-tb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
//     }
//
//     const NavStyle = {
//         padding: '0 50px'
//     }
//
//     const Row = styled.div`
//   writing-mode: horizontal-tb;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

    const {id} = useParams();
    const params = useParams(); //url로 넘어온 파라미터를 받는 역할 (App.js 의 :id 참고)
    const groupId = params.id; //(params의 :id를 받는 역할)
    console.log("groupId ", groupId)

    const [value, setValue] = React.useState(0);

    return (

        // <Navbar fixed="bottom">
        //
        //
        //     <Nav className="mx-auto">
        //
        //         <Nav.Link href="/"
        //                   style={NavStyle}
        //         >
        //             <FontAwesomeIcon icon={faBookOpen} />
        //             <Row
        //                 style={textStyle}
        //             >
        //                 <span>과제</span>
        //             </Row>
        //         </Nav.Link>
        //
        //         <Nav.Link href={`/todo/${groupId}`}
        //                   style={NavStyle}
        //         >
        //             <FontAwesomeIcon icon={faCheckSquare} />
        //             <Row
        //                 style={textStyle} groupId={groupId}
        //             ><span>Todo</span></Row>
        //         </Nav.Link>
        //
        //         <Nav.Link href="/profile"
        //                   style={NavStyle} groupId={groupId}
        //         >
        //             <FontAwesomeIcon icon={faCalendar} />
        //             <Row
        //                 // style={textStyle}
        //             ><span>캘린더</span></Row>
        //         </Nav.Link>
        //
        //         <Nav.Link href={`/timer/${groupId}`} style={NavStyle}>
        //             <FontAwesomeIcon icon={faClock} />
        //             <Row style={textStyle}><span>타이머</span></Row>
        //         </Nav.Link>
        //
        //         <Nav.Link href={`/feed/${groupId}`} style={NavStyle}>
        //             <FontAwesomeIcon icon={faClock} />
        //             <Row style={textStyle}><span>피드</span></Row>
        //         </Nav.Link>
        //
        //
        //     </Nav>
        //
        // </Navbar>



    <Box sx={{ width: 500 }}>
        <BottomNavigation
            style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction
                label="과제"
                icon={<FontAwesomeIcon icon={faBookOpen} />}
                component={Link}
                to="/"
            />

            <BottomNavigationAction
                label="인증"
                icon={<FontAwesomeIcon icon={faCheckSquare} />}
                component={Link}
                to={`/todo/${groupId}`}
            />

            <BottomNavigationAction
                label="캘린더"
                icon={<FontAwesomeIcon icon={faCalendar} />}
                component={Link}
                to="/profile"
            />

            <BottomNavigationAction
                label="타이머"
                icon={<FontAwesomeIcon icon={faClock} />}
                component={Link}
                to={`/timer/${groupId}`}
            />

            <BottomNavigationAction
                label="피드"
                icon={<FontAwesomeIcon icon={faClock} />}
                component={Link}
                to={`/feed/${groupId}`}
            />

        </BottomNavigation>
    </Box>

    );
};