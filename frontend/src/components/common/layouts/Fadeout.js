import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {Grid, Typography, Box} from "@mui/material";
import { useMediaQuery } from 'react-responsive';

function Fadeout() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    });

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.location.href = '/main';
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <div>
                        <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '100px'}}/>
                        <Typography variant="h1">Instudy</Typography>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Fadeout;