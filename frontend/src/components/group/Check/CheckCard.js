import Card from "@mui/material/Card";
import React, { useState } from "react";
import { Typography, Box, Container } from "@mui/material";
import checkGood from "../../../img/checkGood.JPG";
import checkBad from "../../../img/checkBad.JPG";

const CheckCard = (props) => {
    const { setGoodCount, setBadCount, goodCount, badCount } = props;

    const imgStyle = {
        width: "70px",
        margin: "10px",
    };

    const handleImageClick = (type) => {
        if (type === "good") {
            setGoodCount(goodCount + 1);
        } else if (type === "bad") {
            setBadCount(badCount + 1);
        }
    };

    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <Card sx={{ maxWidth: 345 }}>
                    <Box sx={{ padding: "0 20px" }} onClick={() => handleImageClick("good")}>
                        <img src={checkGood} alt="Good check" style={imgStyle} />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="5vh"
                        >
                            <Typography variant="body1">Good + {goodCount}</Typography>
                        </Box>
                    </Box>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <Box sx={{ padding: "0 20px" }} onClick={() => handleImageClick("bad")}>
                        <img src={checkBad} alt="Bad check" style={imgStyle} />
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="5vh"
                        >
                            <Typography variant="body1">Bad - {badCount}</Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                }}
            >
                {/*<Typography variant="h6">Total: {totalCount}</Typography>*/}
            </Box>
        </Container>
    );
};

export default CheckCard;
