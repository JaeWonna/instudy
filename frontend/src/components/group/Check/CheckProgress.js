import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    console.log("props.value", props.value)
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

export default function CheckProgress({ totalCount }) {
    const [progress, setProgress] = React.useState(totalCount);

    console.log("totalCount", totalCount)

    // React.useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((prevProgress) =>
    //             prevProgress >= 100 ? 0 : prevProgress + 10,
    //         );
    //     }, 800);
    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, []);

    return <CircularProgressWithLabel value={totalCount} />;
}
