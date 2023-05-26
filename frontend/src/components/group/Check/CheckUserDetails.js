import { Box, Typography, Button } from "@mui/material";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import GroupUserList from "./GroupUserList";
import * as React from "react";
import CheckTodoList from "./CheckTodoList";
import CheckCard from "./CheckCard";
import CheckProgress from "./CheckProgress";
import {useState} from "react";

const CheckUserDetails = (props) => {
    const { clickedNum, todos } = props;

    console.log("todos", todos);

    const handleButtonClick = () => {
        // Handle button click logic here
    };

    const [goodCount, setGoodCount] = useState(0);
    const [badCount, setBadCount] = useState(0);

    const totalCount = goodCount - badCount;

    return (
        <>
            <MDBCard className="mb-5">
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="10vh"
                >
                    <Typography variant="h5" gutterBottom>
                        유저{clickedNum} 인증 페이지
                    </Typography>
                </Box>
                <MDBCardBody>
                    <CheckTodoList todos={todos} />
                    <CheckCard setGoodCount={setGoodCount} setBadCount={setBadCount} goodCount={goodCount} badCount={badCount}/>
                    <CheckProgress totalCount={totalCount}/>
                </MDBCardBody>
            </MDBCard>
        </>
    );
};

export default CheckUserDetails;
