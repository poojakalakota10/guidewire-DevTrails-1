import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children, requireAdmin = false }) => {
  const token = localStorage.getItem('gigshield_token');
  const userStr = localStorage.getItem('gigshield_user');
  
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }
  
  const user = JSON.parse(userStr);
  
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthGuard;