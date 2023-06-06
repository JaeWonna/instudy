import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CheckIcon from '@mui/icons-material/Check';
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="20vh"
        >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress size={100} variant="determinate" {...props} />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="h5"
                        component="div"
                        color="text.secondary"
                    >{`${Math.round(props.value)}%`}</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default function CheckProgress({groupId, checkingId}) {
    const [progress, setProgress] = React.useState(0);

    const fetchCheckingPercent = async (checkingId) => {
        try {
            const response = await axios.post("/checking/percent", {
                checkingId: checkingId,
            });
            const percent = response.data;
            console.log("Percent:", percent);
            setProgress(percent);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    fetchCheckingPercent(checkingId);

    const [members, setMembers] = useState([]);
    const [checks, setChecks] = useState([]);

    useEffect(() => {
        const fetchMembersAndChecks = async () => {
            try {
                const [membersResponse, checksResponse] = await Promise.all([
                    axios.post("/checking/read/groupUser", {
                        groupId: groupId,
                    }),
                    axios.post("/checking/groupRead", {
                        groupId: groupId,
                    }),
                ]);

                const membersData = membersResponse.data;
                const checksData = checksResponse.data;

                setMembers(membersData);
                setChecks(checksData);

                const totalCount = membersData.length;
                const performedChecksCount = checksData.length;

                const percent = (performedChecksCount / totalCount) * 100;
                setProgress(percent);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchMembersAndChecks();
    }, []);

    if (progress >= 50) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="20vh"
            >
                <Card variant="outlined" sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                                <>
                                    <CheckCircleIcon color="success" fontSize="large" />
                                    인증 완료
                                </>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {progress}% Complete
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        ); // Render the other component when progress is 50% or above
    }

    return (
        <>
            <CircularProgressWithLabel value={progress} />
        </>
    );
}
