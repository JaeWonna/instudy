import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import {Typography} from "@mui/material";
import * as React from "react";

const ProfileGroupCard = (props) => {
    const { group } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.path);
    };
    
    return (
        <>
        <Container>
            <div class="card">
            <div class="card-body">
                <Typography variant="h5" gutterBottom>{group.groupName}</Typography>
                <div className="col-12">
                    <button type="button" className="btn btn-primary" onClick={handleClick}>그룹으로 이동</button>
                </div>
                </div>
            </div>
            </Container>
        </>
    );
};

export default ProfileGroupCard;