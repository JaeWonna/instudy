import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const SignIn = (props) => {
    const navigate = useNavigate();

    const onClickSignUp = () => {
        navigate(`/signUp`);
    };

    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const onClickLogin = () => {
        console.log("click login");
        console.log("ID : ", inputId);
        console.log("PW : ", inputPw);
        axios
            .post("/signin", {
                email: inputId,
                passwd: inputPw,
            })
            .then((res) => {
                // console.log(res);
                // console.log("res.data.userId :: ", res.data.userId);
                // console.log("res.data.msg :: ", res.data.msg);
                // if (res.data.email === undefined) {
                //     // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                //     console.log("======================", res.data.msg);
                //     alert("입력하신 id 가 일치하지 않습니다.");
                // } else if (res.data.email === null) {
                //     // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                //     console.log(
                //         "======================",
                //         "입력하신 비밀번호 가 일치하지 않습니다."
                //     );
                //     alert("입력하신 비밀번호 가 일치하지 않습니다.");
                // } else if (res.data.email === inputId) {
                //     // id, pw 모두 일치 userId = userId1, msg = undefined
                //     console.log("======================", "로그인 성공");
                //     sessionStorage.setItem("user_id", inputId); // sessionStorage에 id를 user_id라는 key 값으로 저장
                //     sessionStorage.setItem("name", res.data.name); // sessionStorage에 id를 user_id라는 key 값으로 저장
                // }
                console.log(res);
                if (res.data === true) {
                    console.log("======================", "로그인 성공");
                    sessionStorage.setItem("user_id", inputId); // sessionStorage에 id를 user_id라는 key 값으로 저장
                    sessionStorage.setItem("name", res.data.name); // sessionStorage에 id를 user_id라는 key 값으로 저장
                    // 작업 완료 되면 페이지 이동(새로고침)
                    document.location.href = "/";
                } else {
                    alert("아이디 또는 비밀번호가 맞지 않습니다.");
                }
            })
            .catch();
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="id" name="input_id" value={inputId} onChange={handleInputId} placeholder="user id" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" name="input_pw" value={inputPw} onChange={handleInputPw} placeholder="Password" />
                </Form.Group>
            </Form>

            <Button
                type="button"
                onClick={onClickLogin}
            >
                확인
            </Button>
            <Button variant="success" onClick={onClickSignUp}>회원가입</Button>{' '}
            {/*<Button onclick={() => props.history.push('/')}>뒤로가기</Button>*/}

        </>

    );
};

export default SignIn;