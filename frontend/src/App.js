/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
import React, { useState, createContext, useContext } from 'react';
import { Outlet } from "react-router-dom";
import './App.css';
import BottomNav from "./BottomNav";
import Header from "./components/Header";
import Footer from './components/Footer';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const MyContext = React.createContext({ isLoggedIn: true });

  return (
    <>
<MyContext.Provider value={{ isLoggedIn: true }}>
    <Header MyContext={MyContext} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </MyContext.Provider>
    <Outlet />
    <Footer />
    <BottomNav />
    </>
  );
}

export default App;
