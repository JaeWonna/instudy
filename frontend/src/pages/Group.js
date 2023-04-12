import { useState, useEffect } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import groupMember from '../img/groupMember.jpg'; 
import { Link } from "react-router-dom";
import GroupCreateModal from "../components/group/GroupCreateModal";
import '../css/Group.css';


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

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    }

    return (
        <>
        <Container>
        {
            group.map(group => (
                <>
                {/* <Container> */}
                <Row>{" "}</Row>
                <Row><Link to={`/group/${group.id}`} key={group.id}>
                    {group.content}
                </Link></Row>
                <hr/>
                {/* </Container> */}
                </>
            ))
        }
        <div class="row">
        <div class="col-md-12 col-lg-6"></div>

        <div class="d-flex justify-content-end align-items-end">

<GroupCreateModal />

</div>
        </div>
       
        </Container>
        
        {/* <button type="button" class="btn btn-primary btn-floating btn-lg" onClick={showModal}>
  <i class="fab fa-airbnb fa-lg pe-none"></i>
</button>
{modalOpen &&  */}


        </>
    )


};

export default Group;