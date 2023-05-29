import { Box, Typography, Button } from "@mui/material";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import GroupUserList from "./GroupUserList";
import * as React from "react";
import CheckTodoList from "./CheckTodoList";
import CheckCard from "./CheckCard";
import CheckProgress from "./CheckProgress";
import {useState, useEffect} from "react";
import axios from "axios";
import MemoView from "./Comment/MemoView";

const CheckUserDetails = (props) => {
    const { clickedNum, todos, loginUser, groupId } = props;

    // console.log("todos", todos);

    const handleButtonClick = () => {
        // Handle button click logic here
    };

    const [goodCount, setGoodCount] = useState(0);
    const [badCount, setBadCount] = useState(0);

    const totalCount = goodCount - badCount;

    const [readCheckingData, setReadCheckingData] = useState([]);

    console.log("groupId", groupId)

    const [checkingId, setCheckingId] = useState(0);

    useEffect(() => {
        const sendReadRequest = async () => {
            const url = "/checking/groupRead";

            const readData = {
                groupId: groupId,
            };

            try {
                const response = await axios.post(url, readData);
                const checking = response.data;
                setReadCheckingData(checking);
                console.log("checking 배열", checking)
                const foundItem = checking.find((item) => item.userId === loginUser.userId);
                if (foundItem) {
                    setCheckingId(foundItem.checkingId);
                }
            } catch (error) {
                // Handle error
            }
        };

        sendReadRequest();
    }, [groupId]);

    // console.log("checking", checking)
    console.log("checkingId", checkingId)

    // const sendUpdateGrass = async () => {
    //     const url = '/checking/update/grass';
    //
    //     const updateData = {
    //         period: 'period',
    //         userId: loginUser.userId,
    //         groupId: groupId,
    //         checkingId: '1',
    //     };
    //
    //     try {
    //         const response = await axios.post(url, updateData);
    //         const checking = response.data;
    //         if(checking == "grass") {
    //             alert("인증 성공");
    //         }
    //         else {
    //             alert("인증 실패");
    //         }
    //         // console.log('UPDATE Checking:', checking);
    //         // setReadCheckingData(checking);
    //         // 요청 성공 후 처리할 작업 수행
    //     } catch (error) {
    //         if (error.response) {
    //             // 서버 응답이 왔지만 응답 상태 코드가 에러인 경우
    //             console.error('Error:', error.response.data);
    //             console.error('Status code:', error.response.status);
    //         } else if (error.request) {
    //             // 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 오류 등)
    //             console.error('Error:', error.request);
    //         } else {
    //             // 요청 설정을 준비하는 동안 발생한 오류
    //             console.error('Error:', error.message);
    //         }
    //         // 요청 실패 시 처리할 작업 수행
    //     }
    // };
    //
    // sendUpdateGrass();

    console.log("CheckUserDetails에서 loginUser", loginUser)

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
                    <MemoView loginUser={loginUser} checkingId={checkingId}/>
                    <CheckCard setGoodCount={setGoodCount} setBadCount={setBadCount} goodCount={goodCount} badCount={badCount} loginUser={loginUser} readCheckingData={readCheckingData} checkingId={checkingId} setCheckingId={setCheckingId}/>
                    <CheckProgress totalCount={totalCount} readCheckingData={readCheckingData}/>
                </MDBCardBody>
            </MDBCard>
        </>
    );
};

export default CheckUserDetails;
