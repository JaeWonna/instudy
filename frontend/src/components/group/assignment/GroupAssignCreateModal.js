import { Modal, Paper, Box, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  background-color: white;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const GroupAssignCreateModal = (props) => {
    const [assign, setAssign] = useState({
        description: '',
        title: '',
        group_id: props.groupId,
    })

    const handleInput = (event) => {
        console.log(event)
        setAssign({
            ...assign,
            [event.target.id]: event.target.value
        })
    }

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const createAssign = (event) => {
        const newAssignData = {
            ...assign,
            period: selectedDate
        }

        console.log("newAssignData", newAssignData)

        axios
            .post("/assignment/create", newAssignData)
            .then((response) => {
                const responseData = response.data; // 서버 응답 데이터
                if (responseData === true) {
                    // 그룹 생성 성공
                    alert("과제 생성 완료");
                    // 추가적인 동작 수행 가능
                } else {
                    // 그룹 생성 실패
                    alert("과제 생성 실패");
                    // 추가적인 동작 수행 가능
                }
            })
            .catch((error) => {
                // 서버 요청 실패
                console.error("과제 생성 요청 실패: ", error);
                // 에러 처리 또는 알림 표시
            });
    };

    return (
        <StyledModal open={props.open} onClose={props.onClose}>
            <StyledPaper>
                <Box>
                    <Typography variant='h5' my={1}>과제 생성하기</Typography>
                    {/*<Button className={classes.closeButton} onClick={onClose}>*/}
                    {/*    닫기*/}
                    {/*</Button>*/}
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '90%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="과제 이름"
                                multiline
                                maxRows={4}
                                value={assign.title}
                                id="title"
                                onChange={handleInput}
                            />

                            <TextField
                                id="outlined-multiline-static"
                                label="과제 설명"
                                multiline
                                rows={4}
                                defaultValue="Default Value"
                                value={assign.description}
                                id="description"
                                onChange={handleInput}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="과제 기간"  value={selectedDate}
                                                onChange={handleDateChange}/>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </Box>
                </Box>
                <Button onClick={createAssign}>과제 생성</Button>
                <Button onClick={props.onClose}>닫기</Button>
            </StyledPaper>
        </StyledModal>
    );
}

export default GroupAssignCreateModal;