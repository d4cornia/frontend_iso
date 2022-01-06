import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Assets
import registerImageSrc from 'Image/new-register.jpg';
import 'css/Register.css';
// Custom Functions
import useInput from 'customHooks/useInput';
import Validator from 'helper/validator';
import _calculateAge from 'helper/functions';
import 'helper/functions';
// Components
import CustomInput from 'Components/Reusable/CustomInput';

const Register = () => {
  const navigate = useNavigate();

  // Axios Functions

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
        navigate('/login?register=success');
      });
  };

  const isUsernameAvailable = async () => {
    const usernameData = await axios
      .get(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/check/username/${username.current.value}`
      )
      .then((res) => {
        if (res.data.error_msg) {
          username.current.showError(res.data.error_msg);
        }
      });
  };

  const isEmailAvailable = async () => {
    const emailData = await axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/users/check/email/${email.current.value}`)
      .then((res) => {
        if (res.data.error_msg) {
          email.current.showError(res.data.error_msg);
        }
      });
  };

  // VARIABLES

  const [registerStep, setRegisterStep] = useState(1);

  // FIELDS
  const username = useRef();
  const password = useRef();
  const cPassword = useRef();
  const fullName = useRef();
  const email = useRef();
  const birth = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerStep === 1) {
      let isError = false;

      // Username
      if (username.current.state === -1) isError = true;
      else if (Validator.isEmpty(username.current.value)) {
        isError = true;
        username.current.showError(`Username is required`);
      }

      // Password
      if (Validator.isEmpty(password.current.value)) {
        isError = true;
        password.current.showError(`Password is required`);
      } else if (!Validator.isStrictAlphaNum(password.current.value)) {
        isError = true;
        password.current.showError(`Password must contains atleast 1 letter and 1 number`);
      }

      // Confirm Password
      if (Validator.isEmpty(cPassword.current.value)) {
        isError = true;
        cPassword.current.showError(`Confirm Password is required`);
      } else if (cPassword.current.value !== password.current.value) {
        isError = true;
        cPassword.current.showError(`Confirm Password doesn't match Password`);
      }

      // Jika tidak ada error, Lanjut step 2, ADUADUADU
      if (!isError) {
        setRegisterStep(registerStep + 1);
      }
    } else {
      let isError = false;

      // Full Name
      if (Validator.isEmpty(fullName.current.value)) {
        isError = true;
        fullName.current.showError(`Full Name is required`);
      } else if (!Validator.isAlpha(fullName.current.value)) {
        isError = true;
        fullName.current.showError(`Full Name must only consist of letters`);
      }

      // Email
      if (email.current.state === -1) isError = true;
      else if (Validator.isEmpty(email.current.value)) {
        isError = true;
        email.current.showError(`Email Address is required`);
      } else if (!Validator.isEmailValid(email.current.value)) {
        isError = true;
        email.current.showError(`Email Address is invalid`);
      }

      // Birth Date
      if (Validator.isEmpty(birth.current.value)) {
        isError = true;
        birth.current.showError(`Date of Birth is required`);
      }
      const userAge = _calculateAge(new Date(birth.current.value));

      if (userAge < 13) {
        isError = true;
        birth.current.showError(`Age must be 13 or above`);
      }

      // Jika tidak ada error, Lanjut register, ADUADUADU
      if (!isError) {
        register({
          username: username.current.value,
          name: fullName.current.value,
          email: email.current.value,
          age: userAge,
          password: password.current.value,
          confirm_password: cPassword.current.value
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
              <CustomInput
                ref={username}
                name="username"
                label="Username"
                successMessage="Neat Username!"
                blur={isUsernameAvailable}
                isHidden={registerStep != 1}
              />
              <CustomInput
                ref={password}
                name="password"
                type="password"
                label="Password"
                message="Must consists atleast 1 letter and 1 number"
                isHidden={registerStep != 1}
              />
              <CustomInput
                ref={cPassword}
                name="cPassword"
                type="password"
                label="Confirm Password"
                message="Must match with Password"
                isHidden={registerStep != 1}
              />
              <CustomInput
                ref={fullName}
                name="fullName"
                label="Full Name"
                isHidden={registerStep != 2}
              />
              <CustomInput
                ref={email}
                name="email"
                blur={isEmailAvailable}
                label="Email Address"
                message="Will be used for confirmation and login"
                isHidden={registerStep != 2}
              />
              <CustomInput
                ref={birth}
                name="birth"
                type="date"
                label="Date of Birth"
                isHidden={registerStep != 2}
              />

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
