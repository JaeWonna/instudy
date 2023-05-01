import React, { createContext, useContext, useState } from 'react';
import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import BottomNav from "./BottomNav";
import Header from "./components/Header";
import Footer from './components/Footer';
import GroupBottomNav from './components/group/GroupBottomNav';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const MyContext = React.createContext({ isLoggedIn: true });

    return (
        <MyContext.Provider value={{ isLoggedIn: true }}>
            <div MyContext={MyContext} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <Outlet />
                <Footer />
                <Routes>
                    <Route  path="/" element={<BottomNav />} />
                    <Route  path="/profile" element={<BottomNav />} />
                    <Route  path="/group" element={<BottomNav />} />
                    <Route  path="/group/:id" element={<GroupBottomNav />} />
                </Routes>
            </div>
        </MyContext.Provider>
    );
}

export default App;
