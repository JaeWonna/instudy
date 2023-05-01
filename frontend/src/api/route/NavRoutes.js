import BottomNav from "../../BottomNav";
import GroupBottomNav from "../../components/group/GroupBottomNav";

const NavRoutes = [
    {
        path: '/',
        element: <BottomNav />,
        name: '기본네비바',
        description: '기본네비바',
    },
    {
        path: '/profile',
        element: <BottomNav />,
        name: '기본네비바',
        description: '기본네비바',
    },
    {
        path: '/group',
        element: <BottomNav />,
        name: '기본네비바',
        description: '기본네비바',
    },
    {
        path: '/group/:id',
        element: <GroupBottomNav />,
        name: '그룹네비바',
        description: '조회',
    },

];
export default NavRoutes;