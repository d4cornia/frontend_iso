import './App.css';

import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Chat_room from './Components/Chat-room';
import PrivacyPolicy from './Components/PrivacyPolicy';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './Components/PageNotFound';
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
          {/* jika tidak ada url yang cocok dengan route" diatas*/}
          <Route element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
