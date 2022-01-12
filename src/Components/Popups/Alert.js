import React, { forwardRef, useImperativeHandle, useState } from 'react';
import '../../css/components/Alert.css';
import { Alert } from 'react-bootstrap';

const AlertPopup = forwardRef((props, ref) => {
  const [alert, setAlert] = useState({});
  const [isShowing, setShowing] = useState(false);

  useImperativeHandle(ref, () => ({
    showMessage: ({ message, type }) => {
      setAlert((prevState) => ({
        ...prevState,
        message,
        type
      }));
      showAlert();
    },
    hideMessage: () => {
      hideAlert();
    }
  }));

  const hideAlert = () => {
    setShowing(false);
  };

  const showAlert = () => {
    setShowing(true);
    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  return (
    <div className={`alert-popup ${isShowing ? '' : 'hidden'}`}>
      <Alert key={alert.id} variant={alert.type}>
        {alert.message}
      </Alert>
      {/* <p className="alert-message fw-bold">You successfully created your account </p> */}
    </div>
  );
});

export default AlertPopup;
