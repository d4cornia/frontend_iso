import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Auth from './UserAuthentication';
import Navigation from './Components/Reusable/Navigation';

const ProtectedRoute = forwardRef((props, ref) => {
  const isAuth = Auth.useAuth();
  const navigation = useRef();

  useImperativeHandle(ref, () => ({
    showDetailPost: (id) => {
      navigation.current.showDetailPost(id);
    },
    showAlert: (alertObj) => {
      navigation.current.showAlert(alertObj);
    }
  }));

  return isAuth ? (
    <React.Fragment>
      <Navigation ref={navigation} />
      <Outlet />
    </React.Fragment>
  ) : (
    <Navigate to="/login" />
  );
});

export default ProtectedRoute;
