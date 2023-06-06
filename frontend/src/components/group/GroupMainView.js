import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from 'react-bootstrap';
import groupMember from '../../img/groupMember.jpg'; 
import * as mdb from 'mdb-ui-kit';
import { Modal } from 'mdb-ui-kit';
import 'mdb-ui-kit/css/mdb.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';
import GroupAssignCreate from "./assignment/GroupAssignCreate";
import { Box } from "@mui/system";
import axios from "axios";
import GroupCard from "./GroupCard";
import GroupAssignCard from "./assignment/GroupAssignCard";
import GroupBottomNav from "../group/GroupBottomNav";

const GroupMainView = (props) => {
    const {groupId} = useParams();

    const [modal, setModal] = useState(false);

    const [clickedNum, setClickedNum] = useState(0);

    const cardStyle = {
        width: '18rem',
    }

    useEffect( () => {
        getAndSetGroup(groupId);
    }, [groupId]);

    const getAndSetGroup = (groupId) => {

    }

    console.log(setClickedNum)
    console.log(setModal)

    const [assign, setAssign] = useState([]);

    useEffect(()=> {
        const assignData = [

        ];

        setAssign([...assignData]);

        axios
            .post("/assignment/read ", {

            })
            .then((res) => {
                console.log(res.data);
                setAssign(res.data);
                console.log("test");
                console.log(...assign);
            })
            .catch();

    }, []);

    return (
        <>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
        >
            {/* 가운데 정렬할 요소들 */}
            <div>
                <Typography variant="h5" gutterBottom>
                    과제
                </Typography>
                {
                    assign.map(assign => (
                        <GroupAssignCard assign={assign} idx={clickedNum}/>
                    ))
                }
                        <GroupAssignCreate groupId={groupId}/>
            </div>
        </Box>
    <GroupBottomNav />
    </>
    );
};

export default GroupMainView;