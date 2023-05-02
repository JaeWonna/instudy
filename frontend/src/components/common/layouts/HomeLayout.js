import React from 'react';
import { useMediaQuery } from 'react-responsive';
import DesktopMain from './DesktopMain';
import Group from '../../../pages/Group';

function HomeLayout() {
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    });

    return (
        <div>
            {isDesktopOrLaptop ? <DesktopMain /> : <Group />}
        </div>
    )
}

export default HomeLayout;