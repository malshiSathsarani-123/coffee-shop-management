import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/AppNavbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import AddToCart from './pages/AddToCart';
import Cart from './pages/Cart';
import Cake from './pages/Cake';
import Coffee from './pages/Coffee';
import Beverages from './pages/Beverages';
import Tea from './pages/Tea';
import Snacks from './pages/Snacks';
import CoffeeBeansMerchandise from './pages/CoffeeBeansMerchandise';
import ProductDetailsPage from './pages/ProductDetailsPage';
import PlaceOrder from './pages/PlaceOrder';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cartPage" element={<CartPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-to-cart/:id" element={<AddToCart />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/cake" element={<Cake />} />
          <Route path="/coffee" element={<Coffee />} />
          <Route path="/beverages" element={<Beverages />} />
          <Route path="/tea" element={<Tea />} />
          <Route path="/snacks" element={<Snacks />} />
          <Route path="/coffee-beans-merchandise" element={<CoffeeBeansMerchandise />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default App;
