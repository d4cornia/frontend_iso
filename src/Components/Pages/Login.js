import React, { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import userAuth from '../../UserAuthentication';
// Assets
import '../../css/Login.css';
import loginImageSrc from '../../Image/login-image.jpg';
// Components
import Logo from '../Reusable/Logo';
import CustomInput from '../Reusable/CustomInput';
import AlertPopup from '../Popups/Alert';

const Login = (props) => {
  useEffect(() => {
    document.title = 'Login';
    userAuth.logout();
    if (searchParams.get('register') === 'success') {
      alert.current.showMessage({ message: 'Account is successfully created', type: 'success' });
    } else if (searchParams.get('forgot_password') === 'success') {
      alert.current.showMessage({
        message: 'Password has been successfully resetted',
        type: 'success'
      });
    }
  }, []);

  const navigate = useNavigate();

  // VARIABLES
  const [searchParams, setSearchParams] = useSearchParams();
  const username = useRef();
  const password = useRef();
  const alert = useRef();

  // HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Try Login
    userAuth.login(username, password, navigate);
  };

  return (
    <div className="login-container">
      <div className="login-image-container d-none d-xl-block">
        <img className="login-image" src={loginImageSrc} alt="Login Image" />
      </div>
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <Logo className={'logo'} />
          <Form className="login-form" onSubmit={handleSubmit}>
            <h2 className={'login-form-title fw-bold'}>Login</h2>
            <CustomInput
              ref={username}
              name="username"
              message="Email or username associated with your account"
              label="Username"
            />

            <CustomInput ref={password} name="password" type="password" label="Password" />
            <Button variant="primary" type="submit">
              Log in
            </Button>
            <p className="text-muted">
              Don't have any account?{' '}
              <Link to="/register" className="link">
                Register now
              </Link>
            </p>
          </Form>

          <p className="text-muted">
            Forgot your password?{' '}
            <Link to="/forgot-password" className="link">
              Reset Password
            </Link>
          </p>
          <p className="text-muted text_small copyright-text">
            {'© 2022 Polarogram, Inc. All Rights Reserved'}
          </p>
        </div>
      </div>
      <AlertPopup ref={alert} />
    </div>
  );
};

export default Login;
