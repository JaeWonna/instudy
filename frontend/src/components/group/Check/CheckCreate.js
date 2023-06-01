import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from "axios";
import Button from '@mui/material/Button';
import {Box} from "@material-ui/core";
import CheckCard from "./CheckCard";

const CheckCreate = (props) => {
    const { groupId, loginUser, setCheckingId, checkingId } = props;



    console.log("create 누르고 checkingId", checkingId)

    // createCheck();

    return (
        <>
            <CheckCard checkingId={checkingId} loginUser={loginUser}/>
        </>
        );
};

export default CheckCreate;