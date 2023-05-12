import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import profile from "../img/profile.png";
import Container from "react-bootstrap/Container";
import FeedCard from "../components/feed/FeedCard";
import {Stack} from "@mui/material";
import Paper from '@mui/material/Paper';

const Feed = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            {/*<div>피드 페이지입니다</div>*/}
            <div className="col-lg-4">
                <FeedCard/>
            </div>
            {/*<div className="col-lg-4">*/}
            {/*    <FeedCard/>*/}
            {/*</div>*/}
            {/*<div className="col-lg-4">*/}
            {/*    <FeedCard/>*/}
            {/*</div>*/}
            {/*<div className="col-lg-4">*/}
            {/*    <FeedCard/>*/}
            {/*</div>*/}
            {/*<Stack*/}
            {/*    direction={{ xs: 'column', sm: 'row' }}*/}
            {/*    spacing={{ xs: 1, sm: 2, md: 4 }}*/}
            {/*>*/}
            {/*    <Item><FeedCard/></Item>*/}
            {/*    <Item><FeedCard/></Item>*/}
            {/*    <Item><FeedCard/></Item>*/}
            {/*</Stack>*/}

        </div>

    );
}

export default Feed