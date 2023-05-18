import * as React from 'react';
import { styled } from '@mui/material/styles';
import FeedCard from "../components/feed/FeedCard";
import Paper from '@mui/material/Paper';
import {Stack} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import TodoItem from "../components/Profile/TodoItem";
import profile from "../img/profile.png";
import {Grid, Typography} from "@material-ui/core";

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

    return (
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

    );
}

export default Feed