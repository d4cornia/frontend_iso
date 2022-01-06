import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Assets
import registerImageSrc from 'Image/new-register.jpg';
import 'css/Register.css';
// Custom Functions
import Validator from 'helper/validator';
import _calculateAge from 'helper/functions';
import 'helper/functions';
// Components
import CustomInput from 'Components/Reusable/CustomInput';
import Logo from 'Components/Reusable/Logo';

const Register = () => {
  useEffect(() => {
    document.title = 'Register';
  }, []);

  const navigate = useNavigate();

  // VARIABLES
  const [registerStep, setRegisterStep] = useState(1);

  // FIELDS
  const username = useRef();
  const password = useRef();
  const cPassword = useRef();
  const fullName = useRef();
  const email = useRef();
  const birth = useRef();

  // AXIOS

  const register = async (obj) => {
    await axios
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
    await axios
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
    await axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/users/check/email/${email.current.value}`)
      .then((res) => {
        if (res.data.error_msg) {
          email.current.showError(res.data.error_msg);
        }
      });
  };

  // HANDLER

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

  return (
    <div>
      <div className="register-container">
        <div className="register-image-container d-none d-xl-block">
          <img className="register-image" src={registerImageSrc} alt="Register" />
        </div>
        <div className="register-form-container">
          <div className="register-form-wrapper">
            <Logo className={'logo'} />
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
                isHidden={registerStep !== 1}
              />
              <CustomInput
                ref={password}
                name="password"
                type="password"
                label="Password"
                message="Must consists atleast 1 letter and 1 number"
                isHidden={registerStep !== 1}
              />
              <CustomInput
                ref={cPassword}
                name="cPassword"
                type="password"
                label="Confirm Password"
                message="Must match with Password"
                isHidden={registerStep !== 1}
              />
              <CustomInput
                ref={fullName}
                name="fullName"
                label="Full Name"
                isHidden={registerStep !== 2}
              />
              <CustomInput
                ref={email}
                name="email"
                blur={isEmailAvailable}
                label="Email Address"
                message="Will be used for confirmation and login"
                isHidden={registerStep !== 2}
              />
              <CustomInput
                ref={birth}
                name="birth"
                type="date"
                label="Date of Birth"
                isHidden={registerStep !== 2}
              />

              <Button variant="primary" type="submit" className="form-control">
                {registerStep === 2 ? 'Register' : 'Next'}
              </Button>
              {registerStep === 1 && (
                <p className="text-muted">
                  Already have account?{' '}
                  <Link to="/login" className="link">
                    Log in
                  </Link>
                </p>
              )}
              {registerStep === 2 && (
                <p className="text-muted text_small">
                  {'By Registering, you agree with our'}{' '}
                  <Link to="/legal/privacy-policy" target={'__blank'} className="link">
                    Privacy Policy
                  </Link>
                </p>
              )}
              {registerStep === 2 && (
                <p onClick={previousStep} className="link">
                  Back to Previous Step
                </p>
              )}
            </Form>
          </div>
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
