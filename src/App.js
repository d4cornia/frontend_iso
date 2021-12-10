import logo from './logo.svg';
import './App.css';

import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";

import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <Router>
        <div className="App">
            {/* <Navbar/> */}
            <Routes>
                {/* disini jika path sama dengan yang ada di URL maka di append component dalam element */}
                <Route exact path={"/"} element={<Login/>}/>
                <Route exact path={"/register"} element={<Register/>}/>
                <Route exact path={"/home"} element={<Home/>}/>
                <Route exact path={"/profile"} element={<Profile/>}/>
                {/* <Route exact path={"/search"} element={<Search/>}/>
                <Route exact path={"/post"} element={<Post/>}/>
                <Route exact path={"/dm"} element={<DM/>}/> */}
                {/* jika tidak ada url yang cocok dengan route" diatas*/}
                <Route element={<PageNotFound/>}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
