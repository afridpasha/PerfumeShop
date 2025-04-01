import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaSort, FaFilter, FaDownload, FaBox, FaTruck, FaCheck, FaArrowRight } from 'react-icons/fa';
import '../styles/Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock order data for demonstration
  const mockOrders = [
    {
      id: 'ORD12345678',
      date: '2023-06-15',
      status: 'delivered',
      estimatedDelivery: '2023-06-20',
      total: 169.99,
      subtotal: 149.99,
      tax: 10.00,
      shipping: 10.00,
      discount: 0,
      shippingMethod: 'Standard Delivery',
      paymentStatus: 'paid',
      paymentMethod: 'Visa •••• 4242',
      trackingNumber: 'TRK987654321',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      },
      billingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      },
      items: [
        {
          id: 'PRD123',
          name: 'Dior Sauvage',
          image: '/images/perfume1.jpg',
          price: 95.99,
          quantity: 1,
          variation: 'Eau de Parfum, 100ml'
        },
        {
          id: 'PRD456',
          name: 'Chanel No. 5',
          image: '/images/perfume2.jpg',
          price: 54.00,
          quantity: 1,
          variation: 'Eau de Toilette, 50ml'
        }
      ],
      timeline: [
        {
          date: '2023-06-15',
          status: 'Order Placed',
          description: 'Your order has been received and is being processed.'
        },
        {
          date: '2023-06-16',
          status: 'Payment Confirmed',
          description: 'Payment has been successfully processed.'
        },
        {
          date: '2023-06-17',
          status: 'Order Shipped',
          description: 'Your order has been shipped.'
        },
        {
          date: '2023-06-20',
          status: 'Order Delivered',
          description: 'Your order has been delivered successfully.'
        }
      ]
    },
    {
      id: 'ORD87654321',
      date: '2023-06-28',
      status: 'shipped',
      estimatedDelivery: '2023-07-03',
      total: 135.98,
      subtotal: 119.98,
      tax: 6.00,
      shipping: 10.00,
      discount: 0,
      shippingMethod: 'Express Delivery',
      paymentStatus: 'paid',
      paymentMethod: 'Mastercard •••• 5678',
      trackingNumber: 'TRK123456789',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      },
      billingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      },
      items: [
        {
          id: 'PRD789',
          name: 'Versace Eros',
          image: '/images/perfume3.jpg',
          price: 59.99,
          quantity: 2,
          variation: 'Eau de Toilette, 100ml'
        }
      ],
      timeline: [
        {
          date: '2023-06-28',
          status: 'Order Placed',
          description: 'Your order has been received and is being processed.'
        },
        {
          date: '2023-06-29',
          status: 'Payment Confirmed',
          description: 'Payment has been successfully processed.'
        },
        {
          date: '2023-06-30',
          status: 'Order Shipped',
          description: 'Your order has been shipped.'
        }
      ]
    },
    {
      id: 'ORD24681012',
      date: '2023-07-05',
      status: 'processing',
      estimatedDelivery: '2023-07-10',
      total: 89.99,
      subtotal: 79.99,
      tax: 5.00,
      shipping: 5.00,
      discount: 0,
      shippingMethod: 'Standard Delivery',
      paymentStatus: 'paid',
      paymentMethod: 'PayPal',
      trackingNumber: '',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      },
      billingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      },
      items: [
        {
          id: 'PRD321',
          name: 'Tom Ford Tobacco Vanille',
          image: '/images/perfume4.jpg',
          price: 79.99,
          quantity: 1,
          variation: 'Eau de Parfum, 50ml'
        }
      ],
      timeline: [
        {
          date: '2023-07-05',
          status: 'Order Placed',
          description: 'Your order has been received and is being processed.'
        },
        {
          date: '2023-07-06',
          status: 'Payment Confirmed',
          description: 'Payment has been successfully processed.'
        }
      ]
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    // Simulate loading orders from an API
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    filterOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, filterDate, searchQuery, orders]);

  const filterOrders = () => {
    let filtered = [...orders];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    // Filter by date
    if (filterDate === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(order => new Date(order.date) >= thirtyDaysAgo);
    } else if (filterDate === 'last90') {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      filtered = filtered.filter(order => new Date(order.date) >= ninetyDaysAgo);
    } else if (filterDate === 'lastyear') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      filtered = filtered.filter(order => new Date(order.date) >= oneYearAgo);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(query) || 
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }

    setFilteredOrders(filtered);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-delivered';
      case 'shipped':
        return 'status-shipped';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <FaCheck />;
      case 'shipped':
        return <FaTruck />;
      case 'processing':
        return <FaBox />;
      default:
        return null;
    }
  };

  const reorderItems = (items) => {
    // Add items to cart functionality would go here
    console.log('Reordering items:', items);
    alert('Items have been added to your cart!');
  };

  if (loading) {
    return <div className="orders-loading">Loading your orders...</div>;
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>View and manage your orders</p>
      </div>

      <div className="orders-filters">
        <div className="search-filter">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-options">
          <div className="filter-group">
            <label htmlFor="status-filter">
              <FaFilter /> Status:
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="date-filter">
              <FaSort /> Date:
            </label>
            <select
              id="date-filter"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="lastyear">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <h2>No orders found</h2>
          <p>Try adjusting your filters or start shopping to place new orders.</p>
          <Link to="/products" className="shop-now-btn">Shop Now</Link>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h2>Order #{order.id}</h2>
                  <p className="order-date">Placed on {formatDate(order.date)}</p>
                </div>
                <div className={`order-status ${getStatusClass(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                </div>
              </div>

              <div className="order-details">
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Order Total:</span>
                    <span className="total-amount">{formatCurrency(order.total)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Items:</span>
                    <span>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>{order.shippingMethod}</span>
                  </div>
                  <div className="summary-row">
                    <span>Payment:</span>
                    <span className="payment-status">{order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}</span>
                  </div>
                </div>

                <div className="delivery-info">
                  <h3>Delivery Information</h3>
                  <p>
                    {order.estimatedDelivery ? (
                      <>
                        <strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}
                      </>
                    ) : 'Delivery date will be provided once shipped.'}
                  </p>
                  {order.trackingNumber && (
                    <p>
                      <strong>Tracking Number:</strong> {order.trackingNumber}
                    </p>
                  )}
                  <p className="shipping-address">
                    <strong>Ship to:</strong> {order.shippingAddress.name}, {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}, {order.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="order-items">
                <h3>Order Items</h3>
                <div className="items-list">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100x100?text=Perfume';
                        }} />
                      </div>
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-variation">{item.variation}</p>
                        <p className="item-price">{formatCurrency(item.price)} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-timeline">
                <h3>Order Timeline</h3>
                <div className="timeline">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="timeline-event">
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <h4>{event.status}</h4>
                        <p className="event-date">{formatDate(event.date)}</p>
                        <p className="event-description">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-actions">
                <button className="action-btn" onClick={() => reorderItems(order.items)}>
                  <FaArrowRight /> Reorder
                </button>
                <button className="action-btn">
                  <FaDownload /> Invoice
                </button>
                <button className="action-btn help-btn">
                  Need Help?
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="orders-support">
        <h3>Need Assistance with Your Order?</h3>
        <div className="support-options">
          <div className="support-option">
            <h4>Contact Customer Service</h4>
            <p>Our team is available to help you with any questions.</p>
            <button className="support-btn">Chat with Us</button>
          </div>
          <div className="support-option">
            <h4>Return an Item</h4>
            <p>Initiate a return within 30 days of delivery.</p>
            <button className="support-btn">Start Return</button>
          </div>
          <div className="support-option">
            <h4>Order FAQs</h4>
            <p>Find answers to common order questions.</p>
            <button className="support-btn">View FAQs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders; 