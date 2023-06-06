import { Typography } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import CheckUserDetails from "./CheckUserDetails";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CheckUserItem = (props) => {
    const { member, setClickedNum, clickedNum, setDetail, loginUser, groupId } = props;

    const navigate = useNavigate();

    const handleCreateChecking = async () => {
        try {
            const response = await axios.post("/checking/create", {
                userId: loginUser.userId,
                groupId: groupId,
                content: "This is a content",
            });
            const newChecking = response.data;
            console.log("Created Checking:", newChecking);

            navigate(`/check/${groupId}/${member.userId}`); // Redirect to the new URL
        } catch (error) {
            console.error("Error:", error);
            // Handle error case
        }
    };

    const [imgPath, setImgPath] = useState('');
    const [ProfilePath, SetProfilePath] = React.useState();

    useEffect(() => {
        console.log("멤버 이미지 아이디", member.imageId)
        axios
            .post("/image/" + member.imageId, {
                imageId : member.imageId
            })
            .then((response) => {
                let words = response.data.split('/');
                console.log("멤버이미지",words[8])
                SetProfilePath(words[8])
            })
            .catch();

    })

    return (
        <>
            <Avatar
                alt="Remy Sharp"
                src={"/img/" + ProfilePath}
                // src={fetchImage(member.imageId)}
                onClick={() => {
                    setClickedNum(member.userId);
                    setDetail(true);
                    handleCreateChecking();
                    console.log("clickedNum", clickedNum);
                }}
            />
            <Typography>{member.userId}</Typography>
        </>
    );
}

export default CheckUserItem;
