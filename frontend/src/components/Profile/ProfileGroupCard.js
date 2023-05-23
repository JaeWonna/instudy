import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link, useNavigate} from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardMedia, Grid,
    IconButton,
    Modal,
    Stack,
    Typography
} from "@mui/material";
import * as React from "react";
import react from "../../img/react.png";
import {Close} from "@mui/icons-material";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    item: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ProfileGroupCard = (props) => {
    const { group } = props;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.path);
    };

    const classes = useStyles();
    
    return (
        <>
            <Grid item xs={12} sm={4} className={classes.item}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>{group.groupName}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" onClick={handleClick}>그룹으로 이동</Button>
                                </Stack>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                    </CardActions>
                </Card>
            </Grid>
            </>
    );
};

export default ProfileGroupCard;