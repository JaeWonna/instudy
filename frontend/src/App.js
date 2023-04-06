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
import { Outlet } from "react-router-dom";
import './App.css';
import BottomNav from "./BottomNav";
import Header from "./components/Header";

function App() {
  return (
    <>
    <Header />
    <Outlet />
    <BottomNav />
    </>
  );
}

export default App;
