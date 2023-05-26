import React, { createContext, useContext, useState } from 'react';
import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Footer from './components/Footer';
import NavRoutes from "./api/route/NavRoutes";
import mainRoutes from "./api/route/mainRoutes";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const MyContext = React.createContext({ isLoggedIn: true });

    return (
        <MyContext.Provider value={{ isLoggedIn: true }}>
            <div MyContext={MyContext} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
