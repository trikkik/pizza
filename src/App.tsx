import React from 'react';
import './scss/app.scss';
import Header from './components/Header.jsx';
import Home from './pages/Home';
import Error from './pages/Error';
import Cart from './pages/Cart';
import { Outlet, Route, Routes } from 'react-router-dom';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
      </Route>
    </Routes>
  );
}

export default App;
