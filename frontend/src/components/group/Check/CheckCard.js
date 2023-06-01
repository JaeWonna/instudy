import Card from "@mui/material/Card";
import React, {useEffect, useState} from "react";
import { Typography, Box, Container } from "@mui/material";
import checkGood from "../../../img/checkGood.JPG";
import checkBad from "../../../img/checkBad.JPG";
import axios from "axios";
import {useParams} from "react-router-dom";
import {userSlice} from "../../../api/redux/user/userSlice";

const CheckCard = (props) => {
    const { setGoodCount, setBadCount, goodCount, badCount, loginUser , readCheckingData, checkingId, setCheckingId } = props;

    const {groupId} = useParams();
    const params = useParams(); //url로 넘어온 파라미터를 받는 역할 (App.js 의 :id 참고)
    const group_id = params.groupId; //(params의 :id를 받는 역할)
    // console.log("groupId ", group_id)

    const imgStyle = {
        width: "70px",
        margin: "10px",
    };

    console.log("여기서 checkingId", checkingId)

    const handleLike = async () => {
        try {
            const response = await axios.post("/checking/update/like", {
                good: true, // Replace with your logic to determine the like value
                userId: loginUser.userId,
                checkingId: checkingId,
            });
            const updatedChecking = response.data;
            alert("Updated Checking:", updatedChecking);
            // Perform any additional actions with the updated checking
        } catch (error) {
            console.error("Error:", error);
            // Handle error case
        }
    };

    useEffect(() => {
        // Example usage
        handleLike();
    }, []);

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <Card sx={{ maxWidth: 345 }}>
                    <Box sx={{ padding: "0 20px" }} onClick={handleLike}>
                        <img src={checkGood} alt="Good check" style={imgStyle} />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="5vh"
                        >
                            <Typography variant="body1">Good + {goodCount}</Typography>
                        </Box>
                    </Box>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <Box sx={{ padding: "0 20px" }}>
                        <img src={checkBad} alt="Bad check" style={imgStyle} />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="5vh"
                        >
                            <Typography variant="body1">Bad - {badCount}</Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                {/*<Typography variant="h6">Total: {totalCount}</Typography>*/}
            </Box>
        </Container>
    );
};

export default CheckCard;
