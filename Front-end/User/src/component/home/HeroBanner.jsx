// HeroBanner.jsx
import React from 'react';
import { motion } from 'framer-motion';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const HeroBanner = () => {
  const bannerStyle = {
    height: '70vh',
    minHeight: '400px',
    backgroundImage: `
      linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.7)
      ),
      url('/restaurant-banner.png')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <motion.div
      className="hero-banner"
      style={bannerStyle}
      initial="hidden"
      animate="visible"
      variants={fadeUpVariant}
    >
      <div className="container text-center text-white">
        <motion.h1
          className="display-4 fw-bold mb-3"
          style={{
            letterSpacing: '2px',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          }}
          custom={0.2}
          variants={fadeUpVariant}
        >
          Welcome to Bistro Noir
        </motion.h1>
        <motion.p
          className="lead mb-4"
          style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.7)' }}
          custom={0.4}
          variants={fadeUpVariant}
        >
          Experience culinary excellence
        </motion.p>
        <motion.button
          className="btn btn-outline-light btn-lg px-4 py-2"
          onClick={() => (window.location.href = '/reserve')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          custom={0.6}
          variants={fadeUpVariant}
        >
          Reserve a Table
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HeroBanner;
