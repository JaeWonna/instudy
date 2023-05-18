import React from 'react';
import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        id: '',
        password: '',
        userName: '',
        email: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    }

    const signUp = () => {
        console.log(JSON.stringify(values));
        navigate('/');
        axios
            .post('/signup', {
                id: values.id,
                password: values.password,
                name: values.userName,
                email: values.email,
            })
            .then((response) => {
                if (response.data && response.data.success === true) {
                    alert('회원가입 성공')
                }
                if (response.data === false) {
                    alert("이미 사용중인 아이디입니다.");
                }
                console.log(response);
            })
            .catch((error) => {
                // 에러 처리
                console.error(error);
            });
    };

    return (
        <>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Id</Form.Label>
                    <Form.Control name="input_id" value={values.id} onChange={handleChange('id')} placeholder="Enter Id" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="input_pw" value={values.password} onChange={handleChange('password')} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control name="input_username" value={values.userName} onChange={handleChange('userName')} placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="input_email" value={values.email} onChange={handleChange('email')} placeholder="Email" />
                </Form.Group>
            </Form>

            <Button
                type="button"
                onClick={() => signUp()}
            >
                확인
            </Button>
        </>

    );
};

export default SignUp;