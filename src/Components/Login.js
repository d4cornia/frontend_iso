import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import loginImageSrc from '../Image/login-image.jpg';
import '../css/Login.css';
import axios from 'axios';

const Login = () => {
  const [errorUsername, setErrorUsername] = useState({ status: false, text: '' });
  const [errorPassword, setErrorPassword] = useState({ status: false, text: '' });

  const login = async (username, password) => {
    const temp = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/users/login`, {
      username: username,
      password: password
    });

    if (temp.data.status === 'success') {
      localStorage.setItem('username', JSON.stringify(temp.data.data.username));
      localStorage.setItem('email', JSON.stringify(temp.data.data.email));
      localStorage.setItem('name', JSON.stringify(temp.data.data.name));
      localStorage.setItem('x-auth-token', JSON.stringify(temp.data.data.token));
    }
  };
  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.email.value;
    const password = e.target.password.value;

    // if (this.inputValidation(username, password)) {
    //   this.login(username, password);
    // }

    console.log('submit', e);
    console.log('email', e.target.email.value);
    console.log('password', e.target.password.value);
  };

  const inputValidation = (username, password) => {
    // Input Validation
    // if (password === '') {
    //   setErrorPassword(true);
    //   return false;
    // }
  };

  const handleInput = () => {
    // Do Something onInput
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-image-container d-none d-xl-block">
          <img className="login-image" src={loginImageSrc} alt="Login Image" />
        </div>
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <svg
              className="login-logo"
              viewBox="0 0 292 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.24127e-06 248.511L292 248.511L292 279.574L3.88342e-06 279.574L5.24127e-06 248.511Z"
                fill="#212529"
              />
              <path
                d="M149.013 187.675C135.096 187.675 123.565 184.991 114.42 179.623C105.275 174.256 98.4159 166.9 93.8433 157.556C89.2707 148.013 86.9844 137.178 86.9844 125.051C86.7856 106.76 91.8552 91.7501 102.193 80.0204C112.73 68.0919 128.337 62.1277 149.013 62.1277C169.092 62.1277 184.301 67.8931 194.639 79.424C205.176 90.9549 210.444 106.164 210.444 125.051C210.444 136.78 208.258 147.417 203.884 156.959C199.51 166.502 192.751 174.057 183.605 179.623C174.46 184.991 162.929 187.675 149.013 187.675ZM149.013 162.029C157.76 162.029 164.42 160.14 168.993 156.363C173.764 152.586 176.945 147.814 178.536 142.049C180.126 136.084 180.921 130.12 180.921 124.156C180.921 117.993 180.126 111.929 178.536 105.965C176.945 100.001 173.764 95.1299 168.993 91.3525C164.42 87.5751 157.76 85.6865 149.013 85.6865C140.066 85.6865 133.207 87.6745 128.436 91.6507C123.863 95.4281 120.682 100.299 118.893 106.263C117.303 112.029 116.507 117.993 116.507 124.156C116.507 130.12 117.303 136.084 118.893 142.049C120.682 147.814 123.863 152.586 128.436 156.363C133.207 160.14 140.066 162.029 149.013 162.029Z"
                fill="#212529"
              />
              <path
                d="M267.563 49.7021C257.347 49.7021 250.582 47.2578 247.268 42.369C243.955 37.4803 242.298 31.5052 242.298 24.4437C242.298 17.9253 243.955 12.2218 247.268 7.33309C250.858 2.44435 257.623 0 267.563 0C276.951 0 283.302 2.44435 286.616 7.33309C290.205 12.2218 292 17.9253 292 24.4437C292 31.5052 290.205 37.4803 286.616 42.369C283.302 47.2578 276.951 49.7021 267.563 49.7021Z"
                fill="#212529"
              />
            </svg>
            <Form className="login-form" onSubmit={handleSubmit}>
              <h2 className={'login-form-title fw-bold'}>Login</h2>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label>Email Address or Username</Form.Label>
                <Form.Control type="email" name="email" required onInput={handleInput} />
                <div class="text-danger text_small">Example invalid form file feedback</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" required onInput={handleInput} />
                {}
                <div class="text-danger text_small">Example invalid form file feedback</div>
              </Form.Group>
              <Button variant="primary" type="submit">
                Log in
              </Button>
              <p className="text-muted text_small">
                Don't have any account?{' '}
                <Link to="/register" className="link">
                  Register now
                </Link>
              </p>
            </Form>
            <p className="text-muted small copyright-text">
              {'© 2022 Polarogram, Inc. All Rights Reserved'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
