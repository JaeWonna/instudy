import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const SignUp = () => {
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
        axios
            .post('/signup', {
                id: values.id,
                password: values.password,
                name: values.userName,
                email: values.email,
            })
            .then((response) => {
                if (response.data === false) {  //userId가 중복일 때
                    alert("이미 사용중인 아이디입니다.");
                }
                console.log(response);
            })
            .catch();
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