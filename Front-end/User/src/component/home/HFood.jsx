import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { useCart } from 'react-use-cart';
import Swal from 'sweetalert2';
import Rating from '../common/rating/Rating';
import { motion } from 'framer-motion';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HFood = () => {
  const [foods, setFoods] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    axios
      .get('http://localhost:1000/api/admin/foods')
      .then(({ data }) =>
        setFoods(data.filter(f => f.featured.toLowerCase() === 'true'))
      )
      .catch(console.error);
  }, []);

  const addItemHandler = item => {
    addItem({ ...item, id: item._id });
    Swal.fire({
      icon: 'success',
      text: `${item.title} added to cart.`,
      showConfirmButton: false,
      timer: 800,
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: foods.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
    arrows: true,
  };

  // Variants for entry and hover
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 100 },
    }),
    hover: { scale: 1.03 },
  };

  return (
    <section className="py-5 bg-dark text-light">
      <div className="container">
        {/* Animated header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-uppercase text-warning small mb-2">
            Chef’s Featured Selections
          </p>
          <h2 className="display-5 fw-bold">Discover Our Popular Dishes</h2>
          <div
            className="mx-auto border-bottom border-3 border-warning my-3"
            style={{ width: '80px' }}
          />
        </motion.div>

        {foods.length === 0 ? (
          <h4 className="text-center mt-4">No featured dishes available.</h4>
        ) : (
          <Slider {...sliderSettings}>
            {foods.slice(0, 8).map((item, idx) => (
              <div key={item._id} className="px-2">
                <motion.div
                  className="card bg-secondary text-light border-0 shadow h-100"
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={cardVariants}
                >
                  <Link
                    to={`/foods/${item._id}`}
                    className="text-decoration-none"
                  >
                    <div className="ratio ratio-4x3 overflow-hidden">
                      <img
                        src={`/foods/${item.thumb}`}
                        alt={item.title}
                        className="img-fluid"
                        style={{
                          objectFit: 'cover',
                          filter: 'brightness(0.75)',
                        }}
                      />
                    </div>
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-2">
                      <Link
                        to={`/foods/${item._id}`}
                        className="text-warning text-decoration-none"
                      >
                        {item.title}
                      </Link>
                    </h5>
                    <div className="mb-2">
                      <Rating rating={item.rating} color="gold" />{' '}
                      <small className="text-light">
                        ({item.totalReviews})
                      </small>
                    </div>
                    <p className="card-text flex-grow-1 mb-3">
                      {item.description.slice(0, 60)}…
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h6 mb-0">Rs. {item.price}</span>
                      {item.active === 'true' ? (
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => addItemHandler(item)}
                        >
                          <i className="fas fa-cart-plus me-1"></i>
                          Add to Cart
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-light" disabled>
                          Out of Stock
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default HFood;
