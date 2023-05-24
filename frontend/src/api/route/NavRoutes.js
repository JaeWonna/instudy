import BottomNav from "../../BottomNav";
import GroupBottomNav from "../../components/group/GroupBottomNav";

const NavRoutes = [
    {
        path: '/main',
        element: <BottomNav />,
    },
    {
        path: '/profile',
        element: <BottomNav />,
    },
    {
        path: '/group',
        element: <BottomNav />,
    },
    {
        path: '/group/:id',
        element: <GroupBottomNav/>,
    },
    // {
    //     path: '/feed',
    //     element: <GroupBottomNav />,
    // },
    // {
    //     path: '/timer',
    //     element: <GroupBottomNav />,
    // },

];
export default NavRoutes;