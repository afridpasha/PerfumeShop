import React, { useState, useEffect } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    console.log('Form data submitted:', formData);
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Have questions about our products, need assistance with your order, or just want to share your
            experience with us? We're here to help and would love to hear from you.
          </p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <i className="contact-icon">📍</i>
              <div className="contact-text">
                <h3>Visit Us</h3>
                <p>123 Fragrance Boulevard<br />New York, NY 10001<br />United States</p>
              </div>
            </div>
            
            <div className="contact-method">
              <i className="contact-icon">📞</i>
              <div className="contact-text">
                <h3>Call Us</h3>
                <p>Toll-free: +1 (800) 123-4567<br />International: +1 (212) 123-4567</p>
              </div>
            </div>
            
            <div className="contact-method">
              <i className="contact-icon">✉️</i>
              <div className="contact-text">
                <h3>Email Us</h3>
                <p>Customer Service: support@perfumeshop.com<br />General Inquiries: info@perfumeshop.com</p>
              </div>
            </div>
            
            <div className="contact-method">
              <i className="contact-icon">⏰</i>
              <div className="contact-text">
                <h3>Operating Hours</h3>
                <p>Monday to Friday: 9AM - 8PM (EST)<br />Saturday & Sunday: 10AM - 6PM (EST)</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {formSubmitted ? (
            <div className="form-success">
              <p>Thank you for your message! We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          )}
        </div>
      </section>
      
      <section className="contact-map">
        <h2>Find Us</h2>
        <div className="map-placeholder">
          <p>Map loading...</p>
          <p className="map-note">In a real application, this would be an embedded Google Map or similar map service.</p>
        </div>
      </section>
    </div>
  );
};

export default Contact; 