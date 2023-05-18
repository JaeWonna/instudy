import * as React from 'react';
import FeedCard from "../components/feed/FeedCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Grid, Modal, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useNavigate} from "react-router-dom";
import CreateFeed from "../components/feed/CreateFeed";

const Feed = () => {

    const [feeds, setFeeds] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let groupId = 1;

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        // : 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
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

    const createFeed = () => {
        navigate("/createFeed");
    }

    const child = {
        margin: "0 auto"
    }

    const createIcon = {
        position: "fixed",
        right: "5px",
        bottom: "80px"
    }

    return (
        <div>
            <div className="col-md-10" style={child}>
                <Grid container spacing={2}>
                    {
                        feeds.length > 0
                            ?
                            feeds.map((feed) => (
                                <Grid item xs={12} xl={3} lg={4} sm={6}>
                                    <FeedCard
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
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default Feed