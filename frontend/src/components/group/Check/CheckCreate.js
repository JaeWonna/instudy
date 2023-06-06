import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from "axios";
import Button from '@mui/material/Button';
import {Box} from "@material-ui/core";
import CheckCard from "./CheckCard";
import {useParams, useNavigate} from "react-router-dom";
import AddMemo from "./Comment/AddMemo";
import {useState, useEffect} from "react";
import CheckProgress from "./CheckProgress";
import * as React from "react";
import MemoView from "./Comment/MemoView";
import {LoginUser} from '../../../api/route/loginUser';

const CheckCreate = (props) => {
    const { groupId, setCheckingId } = props;

    const {checkingId} = useParams();
    const params = useParams(); //url로 넘어온 파라미터를 받는 역할 (App.js 의 :id 참고)
    const checking_id = params.checkingId; //(params의 :id를 받는 역할)
    // console.log("groupId ", group_id)

    console.log("create 누르고 checkingId", checking_id)

    // createCheck();

    const [memos, setMemos] = useState([]);

    const [isMemo, setIsMemo] = useState(false);
    const [isCheck, setIsCheck] = useState(false);

    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState('');

    useEffect(() => {
        const storedUser = sessionStorage.getItem("loginUser");
        console.log("test");
        console.log(storedUser);
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
        } else {
            navigate("/signIn");
        }
    }, [navigate]);

    // useEffect(() => {
    //     if (isCheck && isMemo) {
    //         navigate(-1); // Navigate back to the previous page
    //     }
    // }, [isCheck, isMemo, navigate]);

    console.log("여기서 로그인유저", loginUser)

    const [goodCount, setGoodCount] = useState(0);
    const [badCount, setBadCount] = useState(0);

    const totalCount = goodCount - badCount;


    return (
        <>
            <CheckCard checkingId={checking_id} loginUser={loginUser} setIsCheck={setIsCheck} setGoodCount={setGoodCount} setBadCount={setBadCount} goodCount={goodCount} badCount={badCount}/>
            <MemoView loginUser={loginUser}

                      checkingId={checkingId} setIsMemo={setIsMemo}
            />
            {/*<CheckRead checkingId={checkingId} />*/}
            <CheckProgress totalCount={totalCount} groupId={groupId}/>
        </>
    );
};

export default CheckCreate;
