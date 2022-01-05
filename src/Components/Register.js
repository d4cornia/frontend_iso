import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import useInput from '../customHooks/useInput';
import { Link, Navigate } from 'react-router-dom';
import registerImageSrc from '../Image/new-register.jpg';
import '../css/Register.css';
import axios from 'axios';
import Validator from '../helper/validator';
import '../helper/functions';
import _calculateAge from '../helper/functions';

const Register = () => {
  const register = async (obj) => {
    const askRegister = await axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/api/users/register`, {
        username: obj.username,
        name: obj.name,
        email: obj.email,
        age: obj.age,
        description: '-',
        password: obj.password,
        confirm_password: obj.confirm_password
      })
      .then((res) => {
        let isError = false;
        if (res.data.inputName === 'email') {
          isError = true;
          setErrorEmail(true);
          setErrorMsgEmail(res.data.error_msg);
        }

        if (res.data.inputName === 'username') {
          isError = true;
          setRegisterStep(1);
          setErrorUsername(true);
          setErrorMsgUsername(res.data.error_msg);
        }

        if (!isError) {
          {
            <Navigate push to="/" />;
          }
        }
      });
  };

  const [registerStep, setRegisterStep] = useState(1);

  // FIELDS
  const [
    username,
    bindUsername,
    clearUsername,
    isErrorUsername,
    setErrorUsername,
    errorMsgUsername,
    setErrorMsgUsername,
    clearErrorMsgUsername
  ] = useInput('', false, '');
  const [
    password,
    bindPassword,
    clearPassword,
    isErrorPassword,
    setErrorPassword,
    errorMsgPassword,
    setErrorMsgPassword,
    clearErrorMsgPassword
  ] = useInput('', false, '');
  const [
    cPassword,
    bindCPassword,
    clearCPassword,
    isErrorCPassword,
    setErrorCPassword,
    errorMsgCPassword,
    setErrorMsgCPassword,
    clearErrorMsgCPassword
  ] = useInput('', false, '');
  const [
    fullName,
    bindFullName,
    clearFullName,
    isErrorFullName,
    setErrorFullName,
    errorMsgFullName,
    setErrorMsgFullName,
    clearErrorMsgFullName
  ] = useInput('', false, '');
  const [
    email,
    bindEmail,
    clearEmail,
    isErrorEmail,
    setErrorEmail,
    errorMsgEmail,
    setErrorMsgEmail,
    clearErrorMsgEmail
  ] = useInput('', false, '');
  const [
    birth,
    bindBirth,
    clearBirth,
    isErrorBirth,
    setErrorBirth,
    errorMsgBirth,
    setErrorMsgBirth,
    clearErrorMsgBirth
  ] = useInput('', false, '');

  // const [FIELDS, setFields] = useState({
  //   username: { name: 'Username', isError: false, errorMsg: '', step: 1 },
  //   password: { name: 'Password', isError: false, errorMsg: '', step: 1 },
  //   confPassword: { name: 'Confirm Password', isError: false, errorMsg: '', step: 1 },
  //   fullName: { name: 'Full Name', isError: false, errorMsg: '', step: 2 },
  //   email: { name: 'Email', isError: false, errorMsg: '', step: 2 },
  //   birth: { name: 'Birth Date', isError: false, errorMsg: '', step: 2 }
  // });
  // TODO:
  // - ERROR TEXT DISPLAY
  // - BIND VALUE atau hide step lain

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerStep === 1) {
      let isError = false;

      // Username
      if (Validator.isEmpty(username)) {
        isError = true;
        setErrorUsername(true);
        setErrorMsgUsername(`Username is required`);
      }

      // Password
      if (Validator.isEmpty(password)) {
        isError = true;
        setErrorPassword(true);
        setErrorMsgPassword(`Password is required`);
      } else if (!Validator.isStrictAlphaNum(password)) {
        isError = true;
        setErrorPassword(true);
        setErrorMsgPassword(`Password must contains atleast 1 letter and 1 number`);
      }

      // Confirm Password
      if (Validator.isEmpty(cPassword)) {
        isError = true;
        setErrorCPassword(true);
        setErrorMsgCPassword(`Confirm Password is required`);
      } else if (cPassword !== password) {
        isError = true;
        setErrorCPassword(true);
        setErrorMsgCPassword(`Confirm Password doesn't match Password`);
      }

      // Jika tidak ada error, Lanjut step 2, ADUADUADU
      if (!isError) {
        setRegisterStep(registerStep + 1);
      }
    } else {
      let isError = false;

      // Full Name
      if (Validator.isEmpty(fullName)) {
        isError = true;
        setErrorFullName(true);
        setErrorMsgFullName(`Full Name is required`);
      }
      // Email
      if (Validator.isEmpty(email)) {
        isError = true;
        setErrorEmail(true);
        setErrorMsgEmail(`Email Address is required`);
      } else if (!Validator.isEmailValid(email)) {
        isError = true;
        setErrorEmail(true);
        setErrorMsgEmail(`Email Address is invalid`);
      }

      // Birth Date
      if (Validator.isEmpty(birth)) {
        isError = true;
        setErrorBirth(true);
        setErrorMsgBirth(`Birth Date is required`);
      }
      const userAge = _calculateAge(new Date(birth));

      if (userAge < 13) {
        isError = true;
        setErrorBirth(true);
        setErrorMsgBirth(`Age must be 13 or above`);
      }

      // Jika tidak ada error, Lanjut register, ADUADUADU
      if (!isError) {
        register({
          username,
          name: fullName,
          email,
          age: userAge,
          password,
          confirm_password: cPassword
        });
      }
    }
  };

  const previousStep = () => {
    setRegisterStep(registerStep - 1);
  };

  useEffect(() => {
    document.title = 'Register';
  }, []);

  return (
    <div>
      <div className="register-container">
        <div className="register-form-container">
          <div className="register-form-wrapper">
            <svg
              className="register-logo"
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
            <Form className="register-form" onSubmit={handleSubmit}>
              <h2 className={'register-form-title fw-bold'}>Register</h2>
              <p>
                Be part of <span className="fw-bold text_primary">Polarogram</span> and share your
                moments, anywhere, anytime.
              </p>
              <p className="fw-bold text-muted text_small">Step {registerStep} of 2</p>
              <Form.Group
                className={`mb-3 input-container ${registerStep != 1 ? 'hidden' : ''}`}
                controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  className={`${isErrorUsername ? 'is-invalid' : ''}`}
                  type="text"
                  name="username"
                  {...bindUsername}
                />
                {isErrorUsername && (
                  <div className="text-danger text_small">{errorMsgUsername}</div>
                )}
              </Form.Group>
              <Form.Group
                className={`mb-3 input-container ${registerStep != 1 ? 'hidden' : ''}`}
                controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={`${isErrorPassword ? 'is-invalid' : ''}`}
                  type="password"
                  placeholder="Password"
                  name="password"
                  placeholder="Must atleast contains 1 alphabet and 1 number"
                  {...bindPassword}
                />
                {isErrorPassword && (
                  <div className="text-danger text_small">{errorMsgPassword}</div>
                )}
              </Form.Group>
              <Form.Group
                className={`mb-3 input-container ${registerStep != 1 ? 'hidden' : ''}`}
                controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  className={`${isErrorCPassword ? 'is-invalid' : ''}`}
                  type="password"
                  placeholder="Must match with Password"
                  name="confPassword"
                  {...bindCPassword}
                />
                {isErrorCPassword && (
                  <div className="text-danger text_small">{errorMsgCPassword}</div>
                )}
              </Form.Group>

              <Form.Group
                className={`mb-3 input-container ${registerStep != 2 ? 'hidden' : ''}`}
                controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  className={`${isErrorFullName ? 'is-invalid' : ''}`}
                  type="text"
                  placeholder="Enter Full Name"
                  name="fullName"
                  {...bindFullName}
                />
                {isErrorFullName && (
                  <div className="text-danger text_small">{errorMsgFullName}</div>
                )}
              </Form.Group>
              <Form.Group
                className={`mb-3 input-container ${registerStep != 2 ? 'hidden' : ''}`}
                controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  className={`${isErrorEmail ? 'is-invalid' : ''}`}
                  type="text"
                  placeholder="Email will be used for confirmation and login"
                  name="email"
                  {...bindEmail}
                />
                {isErrorEmail && <div className="text-danger text_small">{errorMsgEmail}</div>}
              </Form.Group>
              <Form.Group
                className={`mb-3 input-container ${registerStep != 2 ? 'hidden' : ''}`}
                controlId="formAge">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  className={`${isErrorBirth ? 'is-invalid' : ''}`}
                  type="date"
                  name="birth"
                  {...bindBirth}
                />
                {isErrorBirth && <div className="text-danger text_small">{errorMsgBirth}</div>}
              </Form.Group>

              <Button variant="primary" type="submit" className="form-control">
                {registerStep === 2 ? 'Register' : 'Next'}
              </Button>
              {registerStep === 1 && (
                <p className="text-muted text_small">
                  Already have account?{' '}
                  <Link to="/login" className="link">
                    Log in
                  </Link>
                </p>
              )}
              {registerStep === 2 && (
                <p className="text-muted small">
                  {'By Registering, you agree with our'}{' '}
                  <Link to="/legal/privacy-policy" target={'__blank'} className="link">
                    Privacy Policy
                  </Link>
                </p>
              )}
              {registerStep === 2 && (
                <p onClick={previousStep} className="link text_small">
                  Back to Previous Step
                </p>
              )}
            </Form>
          </div>
        </div>
        <div className="register-image-container d-none d-xl-block">
          <img className="register-image" src={registerImageSrc} alt="Register Image" />
        </div>
      </div>
      {/* <div className={'register-container'}>
        <div className={'row'}>
          <div className={'image col-sm-12 col-md-5 col-lg-5'}>
            <img
              className={'image-login d-none d-md-block'}
              src={registerimage}
              style={{ width: '80%' }}
            />
          </div>
          <div
            className={'register col-sm-12 col-md-6 col-lg-6'}
            style={{ 'margin-top': '1%', padding: '3%' }}>
            <h3 className={'center'}>Register</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" />
              </Form.Group>
              <Button variant="primary" type="submit" className="form-control">
                Submit
              </Button>
              <p className="text-muted text_small">
                By Registering, You agreed with our Terms and Services.
              </p>
            </Form>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Register;
