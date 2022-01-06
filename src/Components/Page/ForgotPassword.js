import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [forgotStep, setforgotStep] = useState(1);

  // FIELDS
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [cPassword, setCPassword] = useState({});
  const [fullName, setFullName] = useState({});
  const [email, setEmail] = useState({});
  const [birth, setBirth] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (forgotStep === 1) {
      let isError = false;
    // Email
      if (Validator.isEmpty(email.value)) {
        isError = true;
        email.setError(`Email Address is required`);
      } else if (!Validator.isEmailValid(email.value)) {
        isError = true;
        email.setError(`Email Address is invalid`);
      }
      // Jika tidak ada error, Lanjut step 2, ADUADUADU
      if (!isError) {
        setforgotStep(forgotStep + 1);
      }
    } else if(forgotStep === 2){
      let isError = false;
      if (!isError) {
        setforgotStep(forgotStep + 1);
      }
    }
    else if(forgotStep === 3)
    {
        let isError = false;
        //   Password
        if (Validator.isEmpty(password.value)) {
            isError = true;
            password.setError(`Password is required`);
        } else if (!Validator.isStrictAlphaNum(password.value)) {
            isError = true;
            password.setError(`Password must contains atleast 1 letter and 1 number`);
        }

    //   Confirm Password
      if (Validator.isEmpty(cPassword.value)) {
        isError = true;
        cPassword.setError(`Confirm Password is required`);
      } else if (cPassword.value !== password.value) {
        isError = true;
        cPassword.setError(`Confirm Password doesn't match Password`);
      }
    }
  };

  const previousStep = () => {
    setforgotStep(forgotStep - 1);
  };

  useEffect(() => {
    document.title = 'Forgot Password';
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
              <h2 className={'register-form-title fw-bold'}>Forgot Password</h2>
              <p>
                Be part of <span className="fw-bold text_primary">Polarogram</span> and share your
                moments, anywhere, anytime.
              </p>
              <p className="fw-bold text-muted text_small">Step {forgotStep} of 3</p>
              <CustomInput
                updateObject={(obj) => setEmail(obj)}
                name="email"
                label="Email"
                placeholder="Email"
                isHidden={forgotStep != 1}
              />
              <CustomInput
                updateObject={(obj) => setPassword(obj)}
                name="OTP"
                type="text"
                label="otp"
                placeholder="OTP Code"
                isHidden={forgotStep != 2}
              />
              <CustomInput
                updateObject={(obj) => setPassword(obj)}
                name="password"
                type="password"
                label="New Password"
                isHidden={forgotStep != 3}
              />
              <CustomInput
                updateObject={(obj) => setCPassword(obj)}
                name="cPassword"
                type="password"
                label="Confirm Password"
                placeholder="Must match with Password"
                isHidden={forgotStep != 3}
              />
              


              <Button variant="primary" type="submit" className="form-control">
                {forgotStep === 3 ? 'Register' : 'Next'}
              </Button>
              {forgotStep === 1 && (
                <p className="text-muted text_small">
                  Already have account?{' '}
                  <Link to="/login" className="link">
                    Log in
                  </Link>
                </p>
              )}
              {forgotStep === 2 && (
                <p className="text-muted small">
                  {'By Registering, you agree with our'}{' '}
                  <Link to="/legal/privacy-policy" target={'__blank'} className="link">
                    Privacy Policy
                  </Link>
                </p>
                
              )}
              {forgotStep === 3 && (
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
    </div>
  );
};

export default ForgotPassword;
