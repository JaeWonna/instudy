import * as React from 'react';
import {Box, Grid, Icon, Input, InputAdornment, InputLabel, OutlinedInput, Paper, TextField} from "@material-ui/core";
import profile from "../../img/profile.png";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import MyCalendar from "./MyCalendar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import * as PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import {Button} from "react-bootstrap";

const ProfileModify = () => {

    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();

    const [values, setValues] = useState(""
        // id: loginUser.userId,
        // name: loginUser.user_name,
        // email: loginUser.email,
        // password: loginUser.password,
    );

    const updateUser = () => {
        console.log(values)
        // sessionStorage.setItem("loginUser", JSON.stringify(values))
        // const storedUser = sessionStorage.getItem("loginUser");
        // console.log("test");
        // console.log(storedUser);
        axios
            .post("/signin", {
                email: values.email,
                passwd: values.password,
            })
            .then((res) => {
                if (res.data.signIn === "true") {
                    console.log("======================", "로그인 성공");
                    console.log(res)
                    sessionStorage.setItem("loginUser", JSON.stringify(res)); // sessionStorage에 로그인한 유저 정보를 loginUser key 값으로 저장
                    const user = JSON.parse(sessionStorage.getItem("loginUser"));// loginUser 값의 String 을 가져와 JSON 형태로 다시 Parse 진행
                    //navigate("/profile");
                    //alert(user.data.userId);

                    // 로그인 성공하면 메인 페이지 이동
                    document.location.href = "/profile";
                } else {
                    //alert("아이디 또는 비밀번호가 맞지 않습니다.");
                }
            })
            .catch();
    }

    console.log("회원정보수정에서 유저아이디", loginUser.userId,)
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    }

    useEffect(()=> {
        const storedUser = sessionStorage.getItem("loginUser");
        console.log("test");
        console.log(storedUser);
        if (storedUser) { // 세션에 로그인한 유저가 저장되었을 때
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
            setValues({
                userId: parsedUser.userId,
                name: parsedUser.user_name,
                email: parsedUser.email,
                password: parsedUser.password,
            });
        } else { // 세션에 저장된 유저가 null일 때 로그인 페이지로 이동
            navigate("/signIn");
        }
    }, []);


    console.log(values)

    console.log(JSON.stringify(loginUser))

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const userUpdate = () => {
            axios.post('/profileModify', {
                id: loginUser.userId,
                name: values.name,
                email: values.email,
                password: values.password,
            })
                .then((response) => {
                    if (response.data === false) {
                        alert("수정에 실패했습니다.");
                    }
                    updateUser()
                    console.log(response);
                    navigate("/profile");
                })
                .catch();
    };


    return (
        <div>
            <div className="row">
                <div className="col-lg-5">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src={profile} className="img-thumbnail" alt="..." width={265} height={265}/>
                            <h5 className="my-3">{loginUser.user_name}</h5>
                            <p className="text-muted mb-1">Full Stack Developer</p>
                            <p className="text-muted mb-4">{loginUser.email}</p>
                            <div className="d-flex justify-content-center mb-2">
                                <button type="button" className="btn btn-primary">Follow</button>
                                <button type="button" className="btn btn-outline-primary ms-1">Message</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="card mb-4 p-4">
                        프로필 수정
                    </div>
                    <div className="card mb-4">
                        <div className="card-body p-4">
                            <div className="row mb-4 p-4">
                                <Grid container spacing={2}>
                                    <Grid xs={4}>
                                        <Item>Name</Item>
                                    </Grid>
                                    <Grid xs={8}>
                                        <TextField className="mx-4" fullWidth sx={{m: 1}}
                                                   id="outlined-multiline-flexible"
                                                   multiline
                                                   maxRows={4}
                                                   defaultValue={loginUser.user_name}
                                                   value={values.name}
                                                   onChange={handleChange('name')}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="row mb-4 p-4">
                                <Grid container spacing={2}>
                                    <Grid xs={4}>
                                        <Item>Email</Item>
                                    </Grid>
                                    <Grid xs={8}>
                                        <TextField className="mx-4" fullWidth sx={{m: 1}}
                                                   id="outlined-multiline-flexible"
                                                   multiline
                                                   maxRows={4}
                                                   defaultValue={loginUser.email}
                                                   value={values.email}
                                                   onChange={handleChange('email')}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="row mb-4 p-4">
                                <Grid container spacing={2}>
                                    <Grid xs={4}>
                                        <Item>Password</Item>
                                    </Grid>
                                    <Grid xs={8}>
                                        <TextField className="mx-4" fullWidth sx={{m: 1}}
                                                   id="outlined-multiline-flexible"
                                                   multiline
                                                   maxRows={4}
                                                   defaultValue={loginUser.password}
                                                   value={values.password}
                                                   onChange={handleChange('password')}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <Button
                                type="button"
                                onClick={() => userUpdate()}
                            >
                                수정하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfileModify