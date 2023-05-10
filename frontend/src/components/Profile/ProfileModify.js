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

const ProfileModify = () => {

    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=> {
        const storedUser = sessionStorage.getItem("loginUser");
        console.log("test");
        console.log(storedUser);
        if (storedUser) { // 세션에 로그인한 유저가 저장되었을 때
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
        } else { // 세션에 저장된 유저가 null일 때 로그인 페이지로 이동
             navigate("/signIn");
        }
    }, []);

    console.log(JSON.stringify(loginUser))

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <div className="row">
                <div className="col-lg-5">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src={profile} className="img-thumbnail" alt="..." width={300} height={300}/>
                                <h5 className="my-3">John Smith</h5>
                                <p className="text-muted mb-1">Full Stack Developer</p>
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
                                         <TextField className= "mx-4" fullWidth sx={{ m: 1 }}
                                             id="outlined-multiline-flexible"
                                             multiline
                                             maxRows={4}
                                             defaultValue= {loginUser.user_name}
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
                                        <TextField className= "mx-4" fullWidth sx={{ m: 1 }}
                                           id="outlined-multiline-flexible"
                                           multiline
                                           maxRows={4}
                                           defaultValue= {loginUser.email}
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
                                        <TextField className= "mx-4" fullWidth sx={{ m: 1 }}
                                           id="outlined-multiline-flexible"
                                           multiline
                                           maxRows={4}
                                           defaultValue= {loginUser.password}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="row mb-4 p-4" >
                                <Grid container spacing={2}>
                                    <Grid xs={4}>
                                        <Item>Name</Item>
                                    </Grid>
                                    <Grid xs={8}>
                                        <TextField className= "mx-4" fullWidth sx={{ m: 1 }}
                                           id="outlined-multiline-flexible"
                                           multiline
                                           maxRows={4}
                                           defaultValue= {loginUser.user_name}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModify