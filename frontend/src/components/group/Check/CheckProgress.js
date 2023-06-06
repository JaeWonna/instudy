import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

export default function CheckProgress({ checkingId, totalCount }) {
    const [progress, setProgress] = useState(0);
    const [members, setMembers] = useState([]);
    const [checks, setChecks] = useState([]);

    const {groupId} = useParams();

    useEffect(() => {
        const fetchMembersAndChecks = async () => {
            try {
                const membersResponse = await axios.post("/checking/read/groupUser", {
                    groupId: groupId,
                });
                const membersData = membersResponse.data;
                setMembers(membersData);

                console.log("Members length:", membersData.length);

                const totalCount = membersData.length;
                setProgress(totalCount > 0 ? (checks.length / totalCount) * 100 : 0);

                console.log("Total count:", totalCount);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchMembersAndChecks();
    }, []);

    if (totalCount >= Math.ceil(members.length / 2)) {
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
                    </CardContent>
                </Card>
            </Box>
        );
    }

    const percent = (totalCount / members.length) * 100;

    return (
        <>
            <CircularProgressWithLabel value={percent} />
        </>
    );
}
