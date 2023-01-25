import React from 'react';
import './scss/app.scss';
import Header from './components/Header.jsx';
import Home from './pages/Home';
import Error from './pages/Error';
import Cart from './pages/Cart';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
