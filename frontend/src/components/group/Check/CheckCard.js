import Card from "@mui/material/Card";
import React, { useState } from "react";
import { Typography, Box, Container } from "@mui/material";
import checkGood from "../../../img/checkGood.JPG";
import checkBad from "../../../img/checkBad.JPG";
import axios from "axios";
import {useParams} from "react-router-dom";

const CheckCard = (props) => {
    const { setGoodCount, setBadCount, goodCount, badCount, loginUser , readCheckingData } = props;

    const {groupId} = useParams();
    const params = useParams(); //url로 넘어온 파라미터를 받는 역할 (App.js 의 :id 참고)
    const group_id = params.groupId; //(params의 :id를 받는 역할)
    // console.log("groupId ", group_id)

    const imgStyle = {
        width: "70px",
        margin: "10px",
    };

    const handleImageClick = async (type) => {
        if (type === "good") {
            setGoodCount(goodCount + 1);
            try {
                // 함수 호출
                await sendCreateRequest();
                console.log("checkingId", checkingId)
                await sendUpdateRequest();
                // 요청 성공 후 처리할 작업 수행
            } catch (error) {
                console.error('Error:', error);
                // 요청 실패 시 처리할 작업 수행
            }
        } else if (type === "bad") {
            setBadCount(badCount + 1);
            try {
                // 함수 호출
                await sendDeleteRequest(checkingId);
                // 요청 성공 후 처리할 작업 수행
            } catch (error) {
                console.error('Error:', error);
                // 요청 실패 시 처리할 작업 수행
            }
        }
    };

    // console.log("checkcard에서 readcheckingdata", readCheckingData)

    // console.log("groupId", group_id)
    // console.log("loginUser", loginUser)

    const [checkingId, setCheckingId] = useState(0);

    const sendCreateRequest = async () => {
        const url = '/checking/create';

        const createData = {
            userId: loginUser.userId,
            groupId: group_id,
            content: 'This is a content.',
        };

        try {
            const response = await axios.post(url, createData);
            const checking = response.data;
            console.log('Checking:', checking);
            setCheckingId(checking.checkingId);
            // 요청 성공 후 처리할 작업 수행
        } catch (error) {
            if (error.response) {
                // 서버 응답이 왔지만 응답 상태 코드가 에러인 경우
                console.error('Error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                // 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 오류 등)
                console.error('Error:', error.request);
            } else {
                // 요청 설정을 준비하는 동안 발생한 오류
                console.error('Error:', error.message);
            }
            // 요청 실패 시 처리할 작업 수행
        }
    };

    const sendDeleteRequest = async () => {
        const url = '/checking/delete';

        const deleteData = {
            checkingId: checkingId,
        };

        try {
            const response = await axios.post(url, deleteData);
            const checking = response.data;
            console.log('Checking:', checking);
            // 요청 성공 후 처리할 작업 수행
        } catch (error) {
            if (error.response) {
                // 서버 응답이 왔지만 응답 상태 코드가 에러인 경우
                console.error('Error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                // 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 오류 등)
                console.error('Error:', error.request);
            } else {
                // 요청 설정을 준비하는 동안 발생한 오류
                console.error('Error:', error.message);
            }
            // 요청 실패 시 처리할 작업 수행
        }
    };

    const sendUpdateRequest = async () => {
        const url = 'http://localhost:8080/checking/update/click';

        const requestData = {
            good: true,
            bad: false,
            userId: loginUser.userId,
            checkingId: checkingId,
            comment: 'This is a comment.',
        };

        try {
            const response = await axios.post(url, requestData);
            const checking = response.data;
            console.log('Checking:', checking);
            // 요청 성공 후 처리할 작업 수행
        } catch (error) {
            if (error.response) {
                // 서버 응답이 왔지만 응답 상태 코드가 에러인 경우
                console.error('Error:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                // 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 오류 등)
                console.error('Error:', error.request);
            } else {
                // 요청 설정을 준비하는 동안 발생한 오류
                console.error('Error:', error.message);
            }
            // 요청 실패 시 처리할 작업 수행
        }
    };

    setGoodCount(readCheckingData.length);

// ...


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
                    <Box sx={{ padding: "0 20px" }} onClick={() => handleImageClick("good")}>
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
                    <Box sx={{ padding: "0 20px" }} onClick={() => handleImageClick("bad")}>
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
