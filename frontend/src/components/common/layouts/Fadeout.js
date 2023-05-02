import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {Grid, Typography} from "@mui/material";

function Fadeout() {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.location.href = '/main';
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    return <div>
        <Grid container alignItems="center">
        <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '100px'}}/>
        <Typography variant="h1">Instudy</Typography>
    </Grid>
    </div>
}

export default Fadeout;