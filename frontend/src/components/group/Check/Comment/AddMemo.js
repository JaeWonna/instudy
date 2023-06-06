import { useRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import {Box} from "@material-ui/core";
import SendIcon from '@mui/icons-material/Send';

function AddMemo({ memos, setMemos, loginUser, checkingId, setIsMemo }) {
    const [inputs, setInputs] = useState({
        content: '',
    });

    const { content } = inputs;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const nextId = useRef(4);

    // const sendCommentRequest = async () => {
    //     const url = '/checking/update/comment';
    //
    //     const commentData = {
    //         userId: loginUser.userId,
    //         checkingId: checkingId,
    //         message: memo.content,
    //     };
    //
    //     console.log("commentData", commentData)
    //
    //     try {
    //         const response = await axios.post(url, commentData);
    //         console.log('Comment response:', response.data);
    //         // Handle the response data or perform any other operations
    //     } catch (error) {
    //         console.error('Error:', error.message);
    //         // Handle the error or display an error message
    //     }
    // };

    console.log("여기서 로그인유저", loginUser)

    const onAdd = () => {
        const memo = {
            content,
        };

        setMemos([...memos, memo]);

        const sendCommentRequest = async () => {
            const url = '/checking/update/comment';

            const commentData = {
                userId: loginUser.userId,
                checkingId: checkingId,
                message: memo.content,
            };

            console.log("commentData", commentData)

            try {
                const response = await axios.post(url, commentData);
                console.log('Comment response:', response.data);
                // Handle the response data or perform any other operations
                setIsMemo(true);
            } catch (error) {
                console.error('Error:', error.message);
                // Handle the error or display an error message
            }
        };

        setInputs({
            content: '',
        });
        nextId.current += 1;

        // if (memo.content) {
            sendCommentRequest();
        // }
    };

    return (
        <>
            {/*<TextField*/}
            {/*    required*/}
            {/*    id="outlined-required"*/}
            {/*    label="내용"*/}
            {/*    name="content"*/}
            {/*    onChange={onChange}*/}
            {/*    value={content}*/}
            {/*    defaultValue="Hello World"*/}
            {/*/>*/}
            {/*<Stack spacing={2} direction="row">*/}
            {/*    <Button variant="contained" onClick={onAdd}>*/}
            {/*        등록*/}
            {/*    </Button>*/}
            {/*</Stack>*/}

            <Box
                sx={{
                    width: 500,
                    maxWidth: '100%',
                }}
            >
                <TextField fullWidth label="댓글을 작성해주세요" id="fullWidth" name="content"
                           onChange={onChange}
                           value={content}
                           defaultValue="Hello World"/>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" endIcon={<SendIcon />} onClick={onAdd}>
                        Send
                    </Button>
                </Stack>
            </Box>



        </>
    );
}

export default AddMemo;
