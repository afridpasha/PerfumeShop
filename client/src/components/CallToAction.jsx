import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CallToAction.css';

const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2>Join Our Fragrance Club</h2>
          <p>
            Subscribe to receive exclusive offers, early access to new releases, 
            and personalized fragrance recommendations.
          </p>
          <form className="subscription-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="email-input" 
              required 
            />
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
