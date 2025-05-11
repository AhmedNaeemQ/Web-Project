import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const cardVariants = {
  hover: { scale: 1.03, boxShadow: '0 6px 18px rgba(0,0,0,0.15)' }
};

const HCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/categories')
      .then(({ data }) => setCategories(data))
      .catch(console.error);
  }, []);

  const settings = {
    dots: true,
    infinite: categories.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <section className="py-5">
      <div className="container">
        {/* Inlined header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-uppercase text-muted small mb-2">
            Curated Categories
          </p>
          <h2 className="display-5 fw-bold">
            Discover Our Signature Flavors
          </h2>
          <div
            className="mx-auto border-bottom border-3 border-primary my-3"
            style={{ width: '80px' }}
          />
        </motion.div>

        {categories.length === 0 ? (
          <h3 className="text-center mt-4">No items found!</h3>
        ) : (
          <Slider {...settings}>
            {categories.map((item, idx) => (
              <div key={item._id || idx} className="px-2">
                <Link
                  to={`/category-food/${item.title}`}
                  className="text-decoration-none"
                >
                  <motion.div
                    className="card h-100 border-0 overflow-hidden"
                    whileHover="hover"
                    variants={cardVariants}
                  >
                    <div className="ratio ratio-4x3">
                      <img
                        src={`/categories/${item.thumb}`}
                        alt={item.title}
                        className="card-img img-fluid"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="card-img-overlay d-flex align-items-end p-0">
                      <h5 className="w-100 text-center bg-dark bg-opacity-50 m-0 py-2 text-white">
                        {item.title}
                      </h5>
                    </div>
                  </motion.div>
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default HCategories;

// Custom arrow components
function SampleNextArrow({ className, onClick }) {
  return (
    <button
      className={`${className} btn btn-sm btn-light position-absolute`}
      style={{ top: '50%', right: '-25px', transform: 'translateY(-50%)' }}
      onClick={onClick}
    >
      ▶
    </button>
  );
}

function SamplePrevArrow({ className, onClick }) {
  return (
    <button
      className={`${className} btn btn-sm btn-light position-absolute`}
      style={{ top: '50%', left: '-25px', transform: 'translateY(-50%)' }}
      onClick={onClick}
    >
      ◀
    </button>
  );
}
