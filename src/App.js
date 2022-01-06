import './App.css';

import Home from 'Components/Page/Home';
import Login from 'Components/Page/Login';
import Register from 'Components/Page/Register';
import Profile from 'Components/Page/Profile';
import Chat_room from 'Components/Page/Chat-room';
import PrivacyPolicy from 'Components/Page/PrivacyPolicy';
import PageNotFound from 'Components/Page/PageNotFound';
import ForgotPassword from 'Components/Page/ForgotPassword';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar/> */}
        <Routes>
          {/* disini jika path sama dengan yang ada di URL maka di append component dalam element */}
          <Route exact path={'/'} element={<Navigate to="/login " />} />
          <Route exact path={'/login'} element={<Login />} />
          <Route exact path={'/register'} element={<Register />} />
          <Route exact path={'/home'} element={<Home />} />
          <Route exact path={'/profile'} element={<Profile />} />
          <Route exact path={'/legal/privacy-policy'} element={<PrivacyPolicy />} />
          {/* <Route exact path={"/search"} element={<Search/>}/>
                <Route exact path={"/post"} element={<Post/>}/>*/}
          <Route exact path={'/chat-room'} element={<Chat_room />} />
          <Route exact path={'/forgot-password'} element={<ForgotPassword />} />
          {/* jika tidak ada url yang cocok dengan route" diatas*/}
          <Route element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
