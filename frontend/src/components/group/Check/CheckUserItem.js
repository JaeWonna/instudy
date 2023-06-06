import { Typography } from "@material-ui/core";
import React, { useState } from "react";
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

    const fetchImage = async (imageId) => {
        try {
            const response = await axios.post(`/image/${imageId}`);
            const imagePath = response.data;
            // Handle the imagePath, e.g., display the image or update state
            console.log("Image path:", imagePath);
            setImgPath(imagePath);
        } catch (error) {
            // Handle the error
            console.error("Error fetching image:", error);
        }
    };

    fetchImage(member.imageId);

    return (
        <>
            <Avatar
                alt="Remy Sharp"
                src={imgPath}
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
