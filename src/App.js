import logo from './logo.svg';
import './App.css';

import Home from "./Components/Home";
import About from "./Components/About";
import Contactus from "./Components/Contactus";
import Navbar from "./Components/Navbar";

import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import Post from "./Components/Post";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <Router>
        <div className="App">
            <Navbar/>
            <Routes>
                {/* disini jika path sama dengan yang ada di URL maka di append component dalam element */}
                <Route exact path={"/"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/search"} element={<Search/>}/>
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={"/post"} element={<Post/>}/>
                <Route path={"/dm"} element={<DM/>}/>
                {/* jika tidak ada url yang cocok dengan route" diatas*/}
                <Route element={<PageNotFound/>}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
