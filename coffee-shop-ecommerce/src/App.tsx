import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/AppNavbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Cake from './pages/Cake';
import Coffee from './pages/Coffee';
import Beverages from './pages/Beverages';
import Tea from './pages/Tea';
import Snacks from './pages/Snacks';
import CoffeeBeansMerchandise from './pages/CoffeeBeansMerchandise';
import ProductDetailsPage from './pages/ProductDetailsPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/cake" element={<Cake />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/tea" element={<Tea />} />
        <Route path="/snacks" element={<Snacks />} />
        <Route path="/coffee-beans-merchandise" element={<CoffeeBeansMerchandise />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
