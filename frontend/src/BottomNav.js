import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function BottomNav() {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ width: 500 }}>
            <BottomNavigation
                style={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction
                    label="그룹"
                    icon={<PeopleIcon />}
                    component={Link}
                    to="/group"
                />
                <BottomNavigationAction
                    label="프로필"
                    icon={<AccountBoxIcon />}
                    component={Link}
                    to="/profile"
                />
            </BottomNavigation>
        </Box>
    );
}
