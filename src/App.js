import React from 'react';
import './scss/app.scss';
import Header from './components/Header.jsx';
import Home from './pages/Home';
import Error from './pages/Error';
import Cart from './pages/Cart';
import { Route, Routes } from 'react-router-dom';

//import pizzas from './assets/pizzas.json';
export const SearchContext = React.createContext('');

function App() {
  const [search, setSearch] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
