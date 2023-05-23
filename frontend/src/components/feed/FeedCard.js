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

const FeedCard = ({feedId, user, feed}) => {

    const [expanded, setExpanded] = React.useState(false);
    const [isHeart, setIsHeart] = React.useState(true);
    const [heart, setHeart] = React.useState({
        heartNum : feed.heartNum,
        heartUser: feed.heartUser
    })

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
                console.log("여긴 피드 카드", JSON.stringify(response))
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
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {feed.userId}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="300"
                        image={profile}
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
                                {feed.content}
                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
        </div>
    )
}

export default FeedCard