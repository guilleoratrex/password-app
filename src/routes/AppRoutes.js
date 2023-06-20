import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FormScreen } from '../screens/FormScreen';
import { SuccessScreen } from '../screens/SuccessScreen';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<FormScreen />} />
      <Route path='/success' element={<SuccessScreen />} />
    </Routes>
  );
};
