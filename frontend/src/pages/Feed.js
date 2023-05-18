import * as React from 'react';
import FeedCard from "../components/feed/FeedCard";
import {useEffect, useState} from "react";
import axios from "axios";
import {Grid, Typography} from "@material-ui/core";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Feed = () => {

    const [feeds, setFeeds] = useState([]);
    let groupId = 1;

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

    const child = {
        margin: "0 auto"
    }

    const createIcon = {
        position: "fixed",
        right: "5px",
        bottom: "80px"
    }

    return (
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
                        <AddCircleOutlineIcon onClick={createFeed}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feed