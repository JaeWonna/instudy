import Fadeout from "../../components/common/layouts/Fadeout";
import HomeLayout from "../../components/common/layouts/HomeLayout";
import SignIn from "../../containers/sign/sign_in/SignIn";
import SignUp from "../../containers/sign/sign_up/SignUp";
import Group from "../../../src/pages/Group";
import GroupMainView from "../../components/group/GroupMainView";
import ProfileModify from "../../components/Profile/ProfileModify";
import Profile from "../../../src/pages/Profile";
import Feed from "../../../src/pages/Feed";
import Timer from "../../../src/pages/Timer";
// import GroupAssignView from "../../components/group/assignment/GroupAssignView";

const mainRoutes = [

    {
        path: "/",
        element: <Fadeout />
    }, //index로 '/' 메인페이지 지정
    {
        path: "/main",
        element: <HomeLayout />
    }, //index로 '/' 메인페이지 지정
    {
        path: "/signIn",
        element: <SignIn />
    },
    {
        path: "/signUp",
        element: <SignUp />
    },
    {
        path: "/group",
        element: <Group /> },
    {
        path: "/group/:id",
        element: <GroupMainView/>
    },
    {
        path: "/profileModify",
        element: <ProfileModify />},
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/feed/:groupId",
        element: <Feed />
    },
    {
        path: "/timer/:groupId",
        element: <Timer />
    },
    // {
    //     path: "/group/:id/:aid",
    //     element: <GroupAssignView />
    // }
];
export default mainRoutes;
