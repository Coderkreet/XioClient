import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Check for a valid token or role in localStorage
  return !!localStorage.getItem('token') && localStorage.getItem('role') === 'Admin';
};

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default ProtectedRoute;
