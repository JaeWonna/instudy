import * as React from 'react';
import FeedCard from "../components/feed/FeedCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Box,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Modal,
    Typography
} from "@material-ui/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useNavigate, useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {MDBCard, MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";
import Todo from "../components/Profile/Todo";
import ImageUpload from "../api/image/ImageUpload";

function TabPanel(props: { index: number, children: ReactNode }) {
    return null;
}

const Feed = () => {

    const [feeds, setFeeds] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // let groupId = 1;
    const [loginUser, setLoginUser] = useState({});
    const [content, setContent] = useState([]);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        background : 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const componentStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    useEffect(() => {

        const storedUser = sessionStorage.getItem("loginUser");
        console.log("test");
        console.log(storedUser);
        if (storedUser) { // 세션에 로그인한 유저가 저장되었을 때
            const parsedUser = JSON.parse(storedUser).data;
            setLoginUser(parsedUser);
        } else { // 세션에 저장된 유저가 null일 때 로그인 페이지로 이동
            navigate("/signIn");
        }

        axios
            .post("/feed/read", {
                groupId : groupId
            })
            .then((response) => {
                setFeeds(response.data);
            })
            .catch();
    }, []);

    console.log(feeds)

    let image;
    let imageId;

    const createFeed = () => {
        axios
            .post("/feed/create", {
                userId : loginUser.userId,
                groupId : groupId,
                content : content,
                imageId : imageId
            })
            .then((response) => {
                handleClose()
                axios.post("/feed/read", {
                        groupId : groupId
                    })
                .then((response) => {
                    setFeeds(response.data);
                })
            })
            .catch();

        axios
            .post("/image/" + imageId, {
                imageId : imageId
            })
            .then((response) => {
                console.log(response)
            })
            .catch();
    }

    const deleteFeed = (feedId) => {
        axios
            .post("/feed/delete", {
                feedId : feedId
            })
            .then((response) => {
                axios.post("/feed/read", {
                    groupId : groupId
                })
                    .then((response) => {
                        setFeeds(response.data);
                    })
            })
            .catch();
    }

    const contentChange = (e) => {
        setContent(e.target.value)
    }

    const child = {
        margin: "0 auto"
    }

    const createIcon = {
        position: "fixed",
        right: "5px",
        bottom: "80px"
    }

    const params = useParams(); //url로 넘어온 파라미터를 받는 역할 (App.js 의 :id 참고)
    const groupId = params.groupId; //(params의 :id를 받는 역할)
    console.log("groupId ", groupId)

    const getImageId = (x) => {
        console.log(x);
        imageId = x;
    }

    return (
        <div>
            <div className="col-md-10" style={child}>
                <MDBCard className="mb-5">
                    <MDBCardBody>
                        <MDBCardTitle><h4 className="text-center my-3 pb-3">피드</h4></MDBCardTitle>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <div className="col-md-10" style={child}>
                <Grid container spacing={2}>
                    {
                        feeds.length > 0
                            ?
                            feeds.map((feed) => (
                                <Grid item xs={12} xl={3} lg={4} sm={6}>
                                    <FeedCard
                                        image
                                        deleteFeed = {deleteFeed}
                                        feedId = {feed.feedId}
                                        user = {loginUser}
                                        feed={feed}
                                    />
                                </Grid>
                            ))
                            :
                            <Typography variant="h3">피드가 없습니다.</Typography>
                    }

                </Grid>
                <div className="modal-footer" style={createIcon}>
                    <div className="flex-shrink-0">
                        <div className="rounded-icon">
                            <AddCircleOutlineIcon onClick={handleOpen}/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={modalStyle}>
                    <div style={componentStyle}>
                    <Dialog open={open} onClose={handleClose} style={{margin : "0 auto"}}>
                        <DialogTitle>피드 추가하기</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                자신의 공부 내용을 추가하세요.<br/>
                                피드를 통해 자신의 공부내용을 기록하고 공유할 수 있습니다.
                            </DialogContentText>
                            <ImageUpload
                                getImageId = {getImageId}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="outlined-multiline-static"
                                type="text"
                                label="내용"
                                multiline
                                rows={4}
                                fullWidth
                                variant="standard"
                                onChange={contentChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>취소</Button>
                            <Button onClick={createFeed}>생성하기</Button>
                        </DialogActions>
                    </Dialog>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Feed