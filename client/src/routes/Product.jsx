import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Product.css';
import { formatPrice } from '../utils/helpers';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/perfumes/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-section">
          <img 
            src={product.image || 'https://via.placeholder.com/500x500?text=Product+Image'} 
            alt={product.name} 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=Product+Image';
            }}
          />
        </div>
        <div className="product-details">
          <h1>{product.name}</h1>
          <p className="product-price">{formatPrice(product.price)}</p>
          <div className="product-meta">
            <span className="meta-item">
              <strong>Brand:</strong> {product.brand || 'Premium Brand'}
            </span>
            <span className="meta-item">
              <strong>Category:</strong> {product.category || 'Luxury Perfume'}
            </span>
            <span className="meta-item">
              <strong>Concentration:</strong> {product.concentration || 'Eau de Parfum'}
            </span>
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-actions">
            <div className="quantity-selector">
              <button className="qty-btn">-</button>
              <input type="number" min="1" max="10" value="1" readOnly />
              <button className="qty-btn">+</button>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
          <div className="product-features">
            <h3>Key Features</h3>
            <ul>
              <li>Long-lasting fragrance</li>
              <li>Premium quality ingredients</li>
              <li>Elegant bottle design</li>
              <li>Perfect for daily wear</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
