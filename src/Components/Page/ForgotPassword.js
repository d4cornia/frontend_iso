import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Assets
import registerImageSrc from 'Image/new-register.jpg';
import 'css/ForgotPassword.css';
// Custom Functions
import useInput from 'customHooks/useInput';
import Validator from 'helper/validator';
import 'helper/functions';
// Components
import Logo from 'Components/Reusable/Logo';
import CustomInput from 'Components/Reusable/CustomInput';

const ForgotPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Reset Password';
  }, []);

  // VARIABLES
  const [forgotStep, setForgotStep] = useState(1);

  // FIELDS
  const otp = useRef();
  const password = useRef();
  const cPassword = useRef();
  const email = useRef();

  // AXIOS

  const requestOtp = async (emailAddress) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/api/users/profile/password/requestReset`, {
        email: emailAddress.current.value
      })
      .then((res) => {
        if (res.data.error_msg) {
          emailAddress.current.showError(res.data.error_msg);
        } else {
          setForgotStep(forgotStep + 1);
        }
      });
  };

  const validateOtp = async (emailAddress, verificationCode) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/api/users/profile/password/verify`, {
        email: emailAddress.current.value,
        verification_code: verificationCode.current.value
      })
      .then((res) => {
        if (res.data.error_msg) {
          verificationCode.current.showError(res.data.error_msg);
        } else {
          setForgotStep(forgotStep + 1);
        }
      });
  };

  const updatePassword = async (emailAddress, newPassword, confirmPassword) => {
    await axios
      .patch(`${process.env.REACT_APP_BASE_API_URL}/api/users/profile/password/reset`, {
        email: emailAddress.current.value,
        new_password: newPassword.current.value,
        confirm_password: confirmPassword.current.value
      })
      .then((res) => {
        navigate('/login?reset_password=success');
      });
  };

  // HANDLER

  const previousStep = () => {
    setForgotStep(forgotStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (forgotStep === 1) {
      let isError = false;

      // Error Checks
      if (Validator.isEmpty(email.current.value)) {
        isError = true;
        email.current.showError(`Email Address is required`);
      } else if (!Validator.isEmailValid(email.current.value)) {
        isError = true;
        email.current.showError(`Email Address is invalid`);
      }

      // Jika tidak ada error, Lanjut step 2
      if (!isError) {
        //Request ke API Forgot
        await requestOtp(email);
      }
    } else if (forgotStep === 2) {
      let isError = false;

      // Error Check
      if (Validator.isEmpty(otp.current.value)) {
        isError = true;
        otp.current.showError(`Confirmation Pin is required`);
      } else if (!Validator.isNumeric(otp.current.value)) {
        isError = true;
        otp.current.showError(`Confirmation Pin must consits of only numbers`);
      }

      // Jika tidak ada error, Lanjut step 3
      if (!isError) {
        await validateOtp(email, otp);
      }
    } else if (forgotStep === 3) {
      let isError = false;

      // Error Check
      //   Password
      if (Validator.isEmpty(password.current.value)) {
        isError = true;
        password.current.showError(`Password is required`);
      } else if (!Validator.isStrictAlphaNum(password.current.value)) {
        isError = true;
        password.current.showError(`Password must contains atleast 1 letter and 1 number`);
      }

      //   Confirm Password
      if (Validator.isEmpty(cPassword.current.value)) {
        isError = true;
        cPassword.current.showError(`Confirm Password is required`);
      } else if (cPassword.current.value !== password.current.value) {
        isError = true;
        cPassword.current.showError(`Confirm Password doesn't match with New Password`);
      }

      // Jika tidak ada error, Update Password
      if (!isError) {
        await updatePassword(email, password, cPassword);
      }
    }
  };

  return (
    <div>
      <div className="forgotpassword-container">
        <div className="forgotpassword-image-container d-none d-xl-block">
          <img className="forgotpassword-image" src={registerImageSrc} alt="Register Image" />
        </div>
        <div className="forgotpassword-form-container">
          <div className="forgotpassword-form-wrapper">
            <Logo className={'logo'} />
            <Form className="forgotpassword-form" onSubmit={handleSubmit}>
              <h2 className={'forgotpassword-form-title fw-bold'}>Forgot Password</h2>
              <p>
                Please enter your <span className="fw-bold text_primary">Email Address</span> to
                receive the Confirmation Pin
              </p>
              <p className="fw-bold text-muted text_small">Step {forgotStep} of 3</p>
              <CustomInput
                ref={email}
                name="email"
                label="Email Address"
                isHidden={forgotStep != 1}
              />
              <CustomInput
                ref={otp}
                name="otp"
                type="text"
                label="Confirmation Pin"
                isHidden={forgotStep != 2}
              />
              <CustomInput
                ref={password}
                name="password"
                type="password"
                label="New Password"
                isHidden={forgotStep != 3}
              />
              <CustomInput
                ref={cPassword}
                name="cPassword"
                type="password"
                label="Confirm New Password"
                placeholder="Must match with New Password"
                isHidden={forgotStep != 3}
              />

              <Button variant="primary" type="submit" className="form-control">
                {forgotStep === 1
                  ? 'Request Pin'
                  : forgotStep === 2
                  ? 'Validate Pin'
                  : 'Reset Password'}
              </Button>
              {forgotStep === 1 && (
                <p className="text-muted">
                  <Link to="/login" className="link">
                    Back to login
                  </Link>
                </p>
              )}
              {forgotStep > 1 && (
                <p onClick={previousStep} className="link">
                  Back to Previous Step
                </p>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
