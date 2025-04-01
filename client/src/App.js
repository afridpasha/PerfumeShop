// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Product from './routes/Product';
import Products from './routes/Products';
import About from './routes/About';
import Contact from './routes/Contact';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartItems from './components/CartItems';
import Orders from './routes/Orders';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import ProductDetail from './routes/ProductDetail';
import './styles/App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartItems />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<div className="not-found">Page not found</div>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;