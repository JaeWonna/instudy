import React, { createContext, useContext, useState } from 'react';
import {Outlet, useParams} from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from './components/Footer';
import NavRoutes from "./api/route/NavRoutes";
import mainRoutes from "./api/route/mainRoutes";
import * as headerRoutes from "react-bootstrap/ElementChildren";
import HeaderRoutes from "./api/route/HeaderRoutes";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const {groupId} = useParams();

    const MyContext = React.createContext({
        isLoggedIn: true,
        groupId: groupId
    });

    const HeaderRoutes = [
        {
            path: '/main',
            element: Header,
        },
        {
            path: '/profile',
            element: Header,
        },
        {
            path: '/group',
            element: Header,
        },
        {
            path: '/group/:groupId',
            element: Header,
        },
        {
            path: '/check/:groupId',
            element: Header,
        },
        {
            path: '/timer/:groupId',
            element: Header,
        },
        {
            path: '/feed/:groupId',
            element: Header,
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

    return (
        <MyContext.Provider value={{ isLoggedIn: true }}>
            <div MyContext={MyContext} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} groupId={groupId}>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} groupId={groupId}/>
                {/*<Routes>*/}
                {/*    {HeaderRoutes.map((route) => (*/}
                {/*        <Route*/}
                {/*            path={route.path}*/}
                {/*            element={<route.element isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}*/}
                {/*            key={route.path}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/*</Routes>*/}
                <Routes>
                    {mainRoutes.map((route) => <Route path={route.path} element={route.element} key={route.path} />)}
                </Routes>
                <Outlet />
                <Footer />
                <Routes>
                    <Route>
                        {NavRoutes.map((route) => <Route path={route.path} element={route.element} key={route.path} />)}
                    </Route>
                </Routes>
            </div>
        </MyContext.Provider>
    );
}

export default App;
