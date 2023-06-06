import Avatar from "@mui/material/Avatar";
import React, {useEffect} from "react";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CommentItem = ({comment, user}) => {

    const [ProfilePath, SetProfilePath] = React.useState();     //현재 로그인한 유저의 프로필 사진
    const [commentUser, setCommentUser] = React.useState();

    useEffect(()=> {
        axios
            .post("/profile", {
                user_id : comment.userId
            })
            .then((response) => {
                setCommentUser(response.data.userId)
                axios
                    .post("/image/" + response.data.imageId, {
                        imageId : response.data.imageId
                    })
                    .then((response) => {
                        let words = response.data.split('/');
                        SetProfilePath(words[8])
                    })
                    .catch();
            })
            .catch();
    })


    const onDelete = () => {
        if(comment.userId === user.userId){
            axios
                .post("/comment/delete", {
                    commentId: comment.commentId
                })
                .then((response) => {
                    alert("삭제 완료")
                })
                .catch();
        }
        else{
            alert("자신의 댓글만 삭제 가능합니다.")
        }
    }

    return (
        <div>
            <CardHeader
                avatar={
                    <Avatar src={"/img/" + ProfilePath} sx={{backgroundColor: '#fff', border: '2px solid #000'}} alt="아바타 이미지" />
                }
                title = {<span style={{ fontSize: 12, color: 'gray'}}>{commentUser}</span>}
                subheader={<span style={{ fontSize: 15, color: 'black'}}>{comment.comment}</span>}
                action={
                    <div>
                        <IconButton>
                            <DeleteOutlineIcon onClick={onDelete}/>
                        </IconButton>
                    </div>
                }
            />
        </div>
    );
};

export default CommentItem;