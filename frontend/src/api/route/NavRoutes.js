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
        path: '/group/:groupId',
        element: <GroupBottomNav />,
    },
    {
        path: '/check/:groupId',
        element: <GroupBottomNav />,
        props: true, // Enable passing route parameters as props
    },
    {
        path: '/timer/:groupId',
        element: <GroupBottomNav />,
        props: true, // Enable passing route parameters as props
    },

    {
        path: '/feed/:groupId',
        element: <GroupBottomNav />,
        props: true, // Enable passing route parameters as props
    },


];
export default NavRoutes;