import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { useState, useRef } from 'react';
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
import Search from './Components/Pages/Search';

// import Navigation from './Components/Reusable/Navigation';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const protectedRoute = useRef();

  // Child Emit Callback
  const popUpDetailPost = (id) => {
    protectedRoute.current.showDetailPost(id);
  };

  const showAlert = (alertObj) => {
    protectedRoute.current.showAlert(alertObj);
  };

  return (
    <Router>
      <div className="App">
        {/* <Navbar/> */}
        <Routes>
          {/* disini jika path sama dengan yang ada di URL maka di append component dalam element */}
          <Route element={<ProtectedRoute ref={protectedRoute} />}>
            <Route exact path={'/'} element={<Navigate to="/home" />} />
            <Route
              exact
              path={'/home'}
              element={<Home showDetailPost={popUpDetailPost} showAlert={showAlert} />}
            />
            <Route path={'/edit-profile'} element={<EditProfile showAlert={showAlert} />} />
            <Route path={'/editPassword'} element={<EditPassword showAlert={showAlert} />} />
            <Route
              path="/profile/:username"
              element={<Profile showDetailPost={popUpDetailPost} showAlert={showAlert} />}
            />
            <Route
              path="/search"
              element={<Search showDetailPost={popUpDetailPost} showAlert={showAlert} />}
            />
            <Route path="/directs">
              <Route exact path={':username'} element={<Chat_room showAlert={showAlert} />} />
              <Route exact path={''} element={<Chat_room showAlert={showAlert} />} />
            </Route>
          </Route>
          <Route exact path={'/login'} element={<Login showAlert={showAlert} />} />
          <Route exact path={'/register'} element={<Register showAlert={showAlert} />} />
          <Route exact path={'/legal/privacy-policy'} element={<PrivacyPolicy />} />
          <Route
            exact
            path={'/forgot-password'}
            element={<ForgotPassword showAlert={showAlert} />}
          />
          {/* <Route exact path={"/search"} element={<Search/>}/>
                <Route exact path={"/post"} element={<Post/>}/>*/}
          {/* jika tidak ada url yang cocok dengan route" diatas*/}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
