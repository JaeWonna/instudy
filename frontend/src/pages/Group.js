import React, { useState, useEffect } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import groupMember from '../img/groupMember.jpg'; 
import { Link } from "react-router-dom";
import GroupCreateModal from "../components/group/GroupCreateModal";


const Group = () => {
    const [group, setGroup] = useState([]);

    useEffect(()=> {
        const groupdata = [
            {id: 1, content: '정보처리기사 필기 스터디', link: '/GroupMainView/1'},
            {id: 2, content: '스프링 스터디', link: '/GroupMainView/2'}, 
            {id: 3, content: '리액트 스터디', link: '/GroupMainView/3'}, 
               ];

        setGroup([...groupdata]);
    }, []);

    const imgStyle = {
        width: '70px',
    }

    // return (
    //    <>
    //    {
    //     group.map((group) => (
    //         <>
    //         <Container>
    //             <Row>{" "}</Row>
    //         <Row>{group.content}</Row>
    //         <Row><Link to={group.link}>{group.content}</Link></Row>
    //         <hr/>
    //         </Container>
    //         </>
    //     ))
    //    }
    //          <div class="flex-shrink-0">
    //               <img src={groupMember} alt="Generic placeholder" class="img-fluid rounded-circle border border-dark border-3" style={imgStyle} />

    //           </div>
    //    </>
    // );

    function handleClick() {
        return <GroupCreateModal />;
    }

    return (
        <>
        {
            group.map(group => (
                <>
                <Container>
                <Row>{" "}</Row>
                <Row><Link to={`/group/${group.id}`} key={group.id}>
                    {group.content}
                </Link></Row>
                <hr/>
                </Container>
                </>
            ))
        }
        <Button onClick={handleClick}>그룹 생성(추후 1. 이미지로 변경 2. 정렬 예정 3. 모달 안 뜸) </Button>

        </>
    )


};

export default Group;