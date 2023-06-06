import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import profile from "../../img/profile.png";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import * as React from "react";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Box, Button, Menu, MenuItem} from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";
import {Stack, TextField} from "@mui/material";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';

function ReplyComment(props: { responseTo: * }) {
    return null;
}

const FeedCard = ({deleteFeed, feedId, user, feed}) => {

    //삭제를 위한 코드
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };


    const [expanded, setExpanded] = React.useState(false);
    const [isHeart, setIsHeart] = React.useState(true);
    const [heart, setHeart] = React.useState({
        heartNum : feed.heartNum,
        heartUser: feed.heartUser
    })

    const [imagePath, setImagePath] = React.useState();
    const [ProfilePath, SetProfilePath] = React.useState();

    useEffect(() => {

        console.log(feed.imageId)

        axios
            .post("/image/" + feed.imageId, {
                imageId : feed.imageId
            })
            .then((response) => {
                let words = response.data.split('/');
                console.log(words[8])
                setImagePath(words[8])
            })
            .catch();
        axios
            .post("/image/" + user.imageId, {
                imageId : user.imageId
            })
            .then((response) => {
                let words = response.data.split('/');
                console.log(words[8])
                SetProfilePath(words[8])
            })
            .catch();

    })

    //setImagePath('../../img/'+ image)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const child = {
        margin: "0 auto"
    }

    const onClickHeart = () => {

        setIsHeart(!isHeart);

        axios
            .post("/feed/update/heartNum", {
                isHeart : isHeart,
                userId : user.userId,
                feedId : feedId
            })
            .then((response) => {
                setHeart(response.data)
        })
    }

    function isUser(element) {
        if(element === user.userId){
            return true;
        }
        return false;
    }

    return (
           <div className="child" style={child}>
                <Card sx={{ maxWidth: '100%' }}>
                    <CardHeader
                        avatar={
                            <Avatar src={"/img/" + ProfilePath}  sx={{ bgcolor: red[500] , border: '2px solid #000'}} alt="아바타 이미지" />
                        }
                        action={
                            <div>
                                <IconButton
                                    aria-label="settings"
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                                >
                                <MenuItem>
                                    {
                                        feed.userId === user.userId
                                        ?
                                            <button className="btn btn-danger" onClick={()=>{deleteFeed(feedId)}}>삭제</button>
                                            :
                                            <button className="btn btn-success" onClick={()=>{
                                                function NDeleteFeed() {
                                                    alert("자신이 작성한 피드만 삭제할 수 있습니다")
                                                }
                                                NDeleteFeed()}}>삭제불가</button>
                                    }
                                </MenuItem>
                                </Menu>
                            </div>

                       }

                        title={user.user_name}
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="300"
                        src = {"/img/" + imagePath}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {/*This impressive paella is a perfect party dish and a fun meal to cook*/}
                            {/*together with your guests. Add 1 cup of frozen peas along with the mussels,*/}
                            {/*if you like.*/}
                            {feed.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {/*<IconButton>*/}
                        {/*    <ModeCommentOutlinedIcon/>*/}
                        {/*</IconButton>*/}
                        <IconButton aria-label="add to favorites">
                            {
                                heart.heartUser.filter(isUser).length > 0
                                    ?
                                    <FavoriteIcon onClick={onClickHeart}/>
                                    :
                                    <FavoriteBorderIcon onClick={onClickHeart}/>
                            }
                        </IconButton>
                        {/*<IconButton aria-label="share">*/}
                        {/*    <ShareIcon />*/}
                        {/*</IconButton>*/}
                        {heart.heartNum}

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                                <Box sx={{ m: 2 }} >
                                    <Stack direction="row" spacing={2}>
                                        <Avatar src={"/img/" + ProfilePath}  sx={{ bgcolor: red[500], border: '2px solid #000' }} alt="아바타 이미지" />                                        <TextField
                                            focused
                                            fullWidth
                                            label="댓글 달기..."
                                            id="outlined-size-small"
                                            defaultValue=""
                                            size="small"
                                        />
                                    </Stack>
                                    <Box sx={{ padding: "20px 20px" }}>{feed.content}</Box>
                                    <ReplyComment responseTo={feed.content} />
                                    <hr style={{ borderTop: '1px solid gray' }} />
                                </Box >
                                {/*{feed.content}*/}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
        </div>
    )
}

export default FeedCard