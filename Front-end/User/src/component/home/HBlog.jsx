import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import moment from "moment";
import { motion } from "framer-motion";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const cardVariants = {
  hidden: i => ({
    opacity: 0,
    y: 20,
    transition: { delay: i * 0.1, type: "spring", stiffness: 100 }
  }),
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02, boxShadow: "0 6px 18px rgba(0,0,0,0.15)" }
};

const HBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1000/api/admin/blogs")
      .then(({ data }) =>
        setBlogs(data.filter(b => b.featured.toLowerCase() === "true"))
      )
      .catch(console.error);
  }, []);

  const settings = {
    dots: true,
    infinite: blogs.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Inline animated header */}
        <motion.div
          className="text-center mb-5"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <p className="text-uppercase text-secondary small mb-2">
            From Our Journal
          </p>
          <h2 className="display-5 fw-bold">Insights & Inspirations</h2>
          <div
            className="mx-auto border-bottom border-3 border-primary my-3"
            style={{ width: "80px" }}
          />
        </motion.div>

        {blogs.length === 0 ? (
          <h4 className="text-center text-secondary">No posts found.</h4>
        ) : (
          <Slider {...settings}>
            {blogs.slice(0, 3).map((post, idx) => (
              <div key={post._id} className="px-2">
                <motion.div
                  className="card h-100 border-0 shadow-sm overflow-hidden"
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={cardVariants}
                >
                  <Link to={`/blogs/${post._id}`} className="text-decoration-none">
                    <div className="ratio ratio-4x3">
                      <img
                        src={`/blogs/${post.thumb}`}
                        alt={post.title}
                        className="card-img-top img-fluid"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span>
                        <i className="fa fa-user me-1" />
                        {post.post_by}
                      </span>
                      <span>
                        <i className="fa fa-calendar-alt me-1" />
                        {moment(post.date).format("MMM D, YYYY")}
                      </span>
                    </div>
                    <Link to={`/blogs/${post._id}`} className="text-dark">
                      <h5 className="card-title">
                        {post.title.length > 60
                          ? post.title.slice(0, 60) + "…"
                          : post.title}
                      </h5>
                    </Link>
                    <p className="card-text flex-grow-1 text-secondary">
                      {post.description.length > 100
                        ? post.description.slice(0, 100) + "…"
                        : post.description}
                    </p>
                    <Link
                      to={`/blogs/${post._id}`}
                      className="btn btn-sm btn-primary mt-3 align-self-start"
                    >
                      <i className="fas fa-eye me-1" />
                      Read More
                    </Link>
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

export default HBlog;
