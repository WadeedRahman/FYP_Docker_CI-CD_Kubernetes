import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const sessionToken = localStorage.getItem('session_token');
  return sessionToken ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
