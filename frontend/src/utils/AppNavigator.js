import React from 'react';
import { NativeRouter, Routes, Route } from 'react-router-native';
import Registration from '../pages/register/Register';
import Login from '../pages/Login/Login';
import { AuthProvider } from './AuthContext';
import Home from '../pages/Home/Home';


const AppNavigator = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Login />} />
        <Route path="/home"element={<AuthProvider><Home /></AuthProvider>} />
      </Routes>
    </NativeRouter>
  );
};

export default AppNavigator;