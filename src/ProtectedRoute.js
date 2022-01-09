import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Auth from './UserAuthentication';
import Navigation from './Components/Reusable/Navigation';

function ProtectedRoute() {
  const isAuth = Auth.useAuth();
  return isAuth ? (
    <React.Fragment>
      <Navigation />
      <Outlet />
    </React.Fragment>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
