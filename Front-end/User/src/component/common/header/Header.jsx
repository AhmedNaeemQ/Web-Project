import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';
import { useCart } from 'react-use-cart';
import Cookies from 'js-cookie';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const { totalUniqueItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const cartRef = useRef();
  const profileRef = useRef();
  const [customer, setCustomer] = useState(null);
  const customerId = Cookies.get('customer');

  // Background toggle on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (cartRef.current && !cartRef.current.contains(e.target)) setOpenCart(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setOpenProfile(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch customer data
  useEffect(() => {
    if (customerId) {
      axios
        .get(`/api/admin/customers/${customerId}`)
        .then(({ data }) => setCustomer(data))
        .catch(console.error);
    }
  }, [customerId]);

  const logout = () => {
    Cookies.remove('customer');
    Cookies.remove('customerName');
    window.location.href = '/';
  };

  const linkColor = scrolled ? 'text-dark' : 'text-white';
  const iconFilter = scrolled ? 'invert(0)' : 'invert(1)';

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
      style={{ transition: 'background-color 0.3s' }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/logo.png" height="40" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler bg-white"
          type="button"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          onClick={() => setNavOpen(prev => !prev)}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: iconFilter }}
          />
        </button>

        <div
          className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            {[ '/categories', '/foods', '/orders','/reservations', '/blogs', '/contact'].map(
              (path, idx) => {
                const labels = ['Categories', 'Food', 'Order','Book', 'Blogs', 'Contact'];
                return (
                  <li className="nav-item" key={idx}>
                    <Link className={`nav-link ${linkColor}`} to={path}>
                      {labels[idx]}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>

          <ul className="navbar-nav align-items-center">
            <li className="nav-item me-3 position-relative" ref={cartRef}>
              <button
                className="btn position-relative"
                onClick={() => setOpenCart(o => !o)}
              >
                <i
                  className="fa fa-shopping-cart fa-lg"
                  style={{ filter: iconFilter }}
                ></i>
                {totalUniqueItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalUniqueItems}
                  </span>
                )}
              </button>
              {openCart && (
                <div
                  className="card p-3 dropdown-menu-end position-absolute"
                  style={{ top: '100%', right: 0, minWidth: '600px', zIndex: 1000 }}
                >
                  <h6 className="mb-3">Shopping Cart</h6>
                  <ShoppingCart />
                </div>
              )}
            </li>

            <li className="nav-item position-relative" ref={profileRef}>
              <button className="btn" onClick={() => setOpenProfile(p => !p)}>
                {customer?.thumb ? (
                  <img
                    src={`/customers/${customer.thumb}`}
                    height="30"
                    className="rounded-circle"
                    alt="avatar"
                  />
                ) : (
                  <i
                    className="fa fa-user-circle fa-2x"
                    style={{ filter: iconFilter }}
                  ></i>
                )}
              </button>
              {openProfile && (
                <ul
                  className="list-unstyled card p-2 position-absolute"
                  style={{ top: '100%', right: 0, zIndex: 1000 }}
                >
                  {customer ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/customer/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;