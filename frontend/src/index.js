import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BottomNav from './BottomNav';
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import NotFound from './pages/NotFound';
import HomeLayout from './components/common/layouts/HomeLayout';
import Groups from './pages/Group';
import Profile from './pages/Profile';
import SignUp from './containers/sign/sign_up/SignUp';
import GroupMainView from './components/group/GroupMainView';
import GroupCreateModal from './components/group/GroupCreateModal';
import SignIn from './containers/sign/sign_in/SignIn';
// import { Provider } from 'react-redux';
import Fadeout from "./components/common/layouts/Fadeout";
import ProfileModify from "./components/Profile/ProfileModify";
import Feed from "./pages/Feed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Fadeout /> }, //index로 '/' 메인페이지 지정
      { index: true, path: "/main", element: <HomeLayout /> }, //index로 '/' 메인페이지 지정
      { path: "/signIn", element: <SignIn />},
      { path: "/signUp", element: <SignUp />},
      { path: "/group", element: <Groups /> },
      { path: "/group/:id", element: <GroupMainView 
      // group={group}
      />},
      { path: "/profileModify", element: <ProfileModify />},
      { path: "/feed", element: <Feed />},
      {
        path: "/profile",
        element: <Profile />
      },

      // 실행화면 테스트
      { path: "/*", element: <GroupCreateModal />}, // import 오류
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();