import axios from 'axios';
import CryptoJS from 'crypto-js';

const authentication = {
  useAuth: () => {
    const user = { isLoggedIn: false };

    // Decrypt Credential Token
    const cred_token = localStorage.getItem('credential-token');

    if (cred_token) {
      const bytes = CryptoJS.AES.decrypt(cred_token, process.env.REACT_APP_SECRET_AUTH_CODE);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      const credential = {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('x-auth-token')
      };

      // Jika credential Token sama dengan localstrogae maka user authenticated
      if (JSON.stringify(credential) === JSON.stringify(decryptedData)) {
        user.isLoggedIn = true;
      }
    }

    return user && user.isLoggedIn;
  },
  login: async (usernameInput, passwordInput, navigate) => {
    await axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/api/users/login`, {
        emailUsername: usernameInput.current.value,
        password: passwordInput.current.value
      })
      .then((res) => {
        if (!res.data.error_msg) {
          const credential = {
            username: JSON.stringify(res.data.data.username),
            email: JSON.stringify(res.data.data.email),
            token: JSON.stringify(res.data.data.token)
          };
          const credToken = CryptoJS.AES.encrypt(
            JSON.stringify(credential),
            process.env.REACT_APP_SECRET_AUTH_CODE
          ).toString();

          localStorage.setItem('username', credential.username);
          localStorage.setItem('email', credential.email);
          localStorage.setItem('x-auth-token', credential.token);
          localStorage.setItem('credential-token', credToken);
          navigate('/');
        } else {
          if (res.data.target === 'username') usernameInput.current.showError(res.data.error_msg);
          else if (res.data.target === 'password')
            passwordInput.current.showError(res.data.error_msg);
        }
      })
      .catch((err) => {
        console.info(err);
      });
  },
  logout: () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('x-auth-token');
  }
};

export default authentication;
