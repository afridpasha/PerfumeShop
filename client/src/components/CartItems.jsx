import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import '../styles/CartItems.css';
import { FaTrash, FaHeart, FaMinus, FaPlus } from 'react-icons/fa';

const CartItems = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    loading, 
    error, 
    removeFromCart, 
    updateQuantity,
    getCartTotal 
  } = useContext(CartContext);
  
  const [savedItems, setSavedItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingRates = {
    standard: 5.99,
    express: 14.99,
    overnight: 24.99
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleSaveForLater = (item) => {
    removeFromCart(item._id);
    setSavedItems([...savedItems, item]);
  };

  const handleMoveToCart = (item) => {
    setSavedItems(savedItems.filter(saved => saved._id !== item._id));
    updateQuantity(item._id, 1);
  };

  const calculateSubtotal = () => getCartTotal();

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal > 100) return 0; // Free shipping over $100
    return shippingRates[shippingMethod];
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <div className="cart-loading">Loading cart...</div>;
  if (error) return <div className="cart-error">{error}</div>;
  if (!cartItems.length) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some perfumes to your cart and they will appear here</p>
        <Link to="/products" className="continue-shopping">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-items-container">
        <h2>Shopping Cart ({cartItems.length} items)</h2>
        
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">{formatPrice(item.price)}</p>
                
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleSaveForLater(item)}
                    className="save-for-later-btn"
                  >
                    <FaHeart />
                    Save for Later
                  </button>
                  
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="remove-btn"
                  >
                    <FaTrash />
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="item-total">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {savedItems.length > 0 && (
          <div className="saved-items">
            <h3>Saved for Later ({savedItems.length} items)</h3>
            {savedItems.map(item => (
              <div key={item._id} className="saved-item">
                <img src={item.image} alt={item.name} />
                <div className="saved-item-details">
                  <h4>{item.name}</h4>
                  <p>{formatPrice(item.price)}</p>
                  <button onClick={() => handleMoveToCart(item)}>
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        
        <div className="promo-code">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button>Apply</button>
        </div>

        <div className="shipping-method">
          <h4>Shipping Method</h4>
          <select 
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
          >
            <option value="standard">Standard Delivery - $5.99</option>
            <option value="express">Express Delivery - $14.99</option>
            <option value="overnight">Overnight Delivery - $24.99</option>
          </select>
        </div>

        <div className="summary-details">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(calculateSubtotal())}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{calculateShipping() === 0 ? 'FREE' : formatPrice(calculateShipping())}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax</span>
            <span>{formatPrice(calculateTax())}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{formatPrice(calculateTotal())}</span>
          </div>
        </div>

        <button 
          onClick={handleCheckout}
          className="checkout-btn"
          disabled={!cartItems.length}
        >
          Proceed to Checkout
        </button>

        <div className="secure-checkout">
          <p>🔒 Secure Checkout</p>
          <div className="payment-methods">
            <img src="/visa.png" alt="Visa" />
            <img src="/mastercard.png" alt="Mastercard" />
            <img src="/amex.png" alt="American Express" />
            <img src="/paypal.png" alt="PayPal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems; 