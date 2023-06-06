import React, {useEffect, useRef, useState} from "react";
import {Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Box} from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import CommentList from "./CommentList";

const CreateFeedComment = ({ProfilePath, feed, user}) => {

    const commentInput = useRef();
    const [comments, setComments] = useState([]);

    useEffect(()=> {
        axios.post("/comment/read", {
            feedId : feed.feedId,
        }).then((response) =>{
            setComments(response.data);
        })
    })


    const onCreate = (comment) => {
        //데이터 저장
        axios
            .post("/comment/create", {
                feedId : feed.feedId,
                userId : user.userId,
                comment : comment,
            }).then((response) => {

                axios.post("/comment/read", {
                    feedId : feed.feedId,
                }).then((response) =>{
                    setComments(response.data);
                })
        })
    }

    const onCheckEnter = (e) => {
        if (e.key === "Enter") {
            onCreate(e.target.value);
            commentInput.current.value ="";
        }
    };

    return (
        <>
            <CardContent>
                <Typography paragraph>
                    <Box sx={{ m: 2 }} >
                        <Stack direction="row" spacing={2}>
                            <Avatar src={"/img/" + ProfilePath}  sx={{backgroundColor: '#fff', border: '2px solid #000' }} alt="아바타 이미지" />
                            <TextField
                                focused
                                fullWidth
                                label="댓글 달기..."
                                id="outlined-size-small"
                                defaultValue=""
                                size="small"
                                inputRef={commentInput}
                                onKeyPress={onCheckEnter}
                            />
                        </Stack>
                        <CommentList comments = {comments} user = {user}/>
                    </Box >
                </Typography>
            </CardContent>
        </>
    );
};

export default CreateFeedComment;