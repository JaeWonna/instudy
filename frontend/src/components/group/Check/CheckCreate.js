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

const CheckCreate = (props) => {
    const { groupId, loginUser, setCheckingId } = props;

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

    useEffect(() => {
        if (isCheck && isMemo) {
            navigate(-1); // Navigate back to the previous page
        }
    }, [isCheck, isMemo, navigate]);

    return (
        <>
            <CheckCard checkingId={checking_id} loginUser={loginUser} setIsCheck={setIsCheck}/>
            <AddMemo memos={memos} setMemos={setMemos} loginUser={loginUser} checkingId={checkingId} setIsMemo={setIsMemo}/>
            {/*<CheckRead checkingId={checkingId} />*/}
            <CheckProgress checkingId={checkingId} />
        </>
    );
};

export default CheckCreate;
