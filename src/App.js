import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// PAGES
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Profile from './Components/Pages/Profile';
import EditProfile from './Components/Pages/EditProfile';
import Chat_room from './Components/Pages/Chat-room';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy';
import PageNotFound from './Components/Pages/PageNotFound';
import ForgotPassword from './Components/Pages/ForgotPassword';
import EditPassword from './Components/Pages/EditPassword';

// AUTH
import ProtectedRoute from './ProtectedRoute';

// import Navigation from './Components/Reusable/Navigation';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Router>
      <div className="App">
        {/* <Navbar/> */}
        <Routes>
          {/* disini jika path sama dengan yang ada di URL maka di append component dalam element */}
          <Route element={<ProtectedRoute />}>
            <Route exact path={'/'} element={<Navigate to="/home" />} />
            <Route exact path={'/home'} element={<Home />} />
            <Route path={'/editProfile'} element={<EditProfile />} />
            <Route path={'/editPassword'} element={<EditPassword />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route exact path={'/directs'} element={<Chat_room />} />
          </Route>
          <Route exact path={'/login'} element={<Login />} />
          <Route exact path={'/register'} element={<Register />} />
          <Route exact path={'/legal/privacy-policy'} element={<PrivacyPolicy />} />
          {/* <Route exact path={"/search"} element={<Search/>}/>
                <Route exact path={"/post"} element={<Post/>}/>*/}
          <Route exact path={'/forgot-password'} element={<ForgotPassword />} />
          {/* jika tidak ada url yang cocok dengan route" diatas*/}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
