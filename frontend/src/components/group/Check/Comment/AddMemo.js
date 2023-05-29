import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddMemo({ memos, setMemos }) {
    const[inputs, setInputs] = useState({
        title: '',
        content: '',
    });

    const { title, content } = inputs;

    const onChange = (e) => { // 입력 함수
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const nextId = useRef(4);

    const onAdd = () => { // 등록 함수
        const memo = {
            id: nextId.current,
            title,
            content,
            date: new Date().getTime(),
        };

        setMemos([...memos, memo]);

        setInputs({
            title: '',
            content: ''
        });
        nextId.current += 1;
    };

    return (
        <>
            <TextField
                required
                id="outlined-required"
                label="내용"
                name="content"
                onChange={onChange}
                value={content}
                defaultValue="Hello World"
            />
            <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={onAdd}>등록</Button>
            </Stack>
        </>
    )
}

export default AddMemo;