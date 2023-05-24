import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from "@mui/material";
import * as React from "react";

const ProfileGroupCard = (props) => {
    const { group, classes } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.path);
    };

    console.log("group", group)

    return (
        <>
            <Grid item xs={12} sm={4} className={classes.item}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>{group.groupName}</Typography>
                        <div className="col-12">
                            <button type="button" className="btn btn-primary" onClick={handleClick}>그룹으로 이동</button>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default ProfileGroupCard;