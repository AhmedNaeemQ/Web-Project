import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Rating from "../common/rating/Rating";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Banner from "../common/banner/Banner";
import { motion } from 'framer-motion';


const SingleFood = () => {
  // GET SINGLE FOOD
  const { id } = useParams();
  const [food, setFood] = useState({});
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchFood = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/foods/${id}`);
      setFood(data);
      setReviews(data.reviews.reverse());
    };
    fetchFood();
  }, [food]);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = reviews.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(reviews.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % reviews.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 100 },
    }),
    hover: { scale: 1.03 },
  };

  // GET RECOMMENDED FOODS
  const [recomFoods, setRecomFoods] = useState([]);
  useEffect(() => {
    const fetchRecomFood = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/foods/recommended`);
      setRecomFoods(data);
    };
    fetchRecomFood();
  }, [recomFoods]);

  // ADD-TO-CART
  const { addItem } = useCart();
  const addItemHandler = (item, id) => {
    item.id = id;
    addItem(item);
    Swal.fire({
      icon: "success",
      title: item.title + " Added.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      <Banner title={food.category} subtitle={food.title}/>
      <section className="food single-food">
        <div className="container">
        <div className="d-flex flex-column flex-md-row gap-4 border rounded-4 shadow-sm p-4 mb-4 bg-white align-items-start">
          {/* Left: Food Image */}
          <div className="flex-shrink-0" style={{ width: '280px', height: '200px' }}>
            <img
              src={`/foods/${food.thumb}`}
              alt={food.title}
              className="img-fluid rounded-3 h-100 w-100"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Right: Info + Button */}
          <div className="flex-grow-1 d-flex flex-column justify-content-between w-100">
            {/* Title + Rating Row */}
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2">
              <h4 className="fw-semibold text-dark mb-2 mb-sm-0 me-3">{food.title}</h4>
              <div className="d-flex align-items-center">
                <Rating rating={food.rating} />
                <small className="text-muted ms-2">({food.totalReviews})</small>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>{food.description}</p>

            {/* Food Details */}
            <ul className="list-unstyled my-3">
              <li className="mb-2 d-flex align-items-center justify-content-between">
                <span className="text-muted">Price</span>
                <h6 className="mb-0 text-dark">Rs {food.price}</h6>
              </li>
              <li className="mb-2 d-flex align-items-center justify-content-between">
                <span className="text-muted">Category</span>
                <h6 className="mb-0 text-dark">{food.category}</h6>
              </li>
              <li className="mb-2 d-flex align-items-center justify-content-between">
                <span className="text-muted">Status</span>
                <h6 className={`mb-0 ${food.active === 'on' ? 'text-success' : 'text-danger'}`}>
                  {food.active === 'on' ? 'Available' : 'Unavailable'}
                </h6>
              </li>
            </ul>

            {/* Add to Cart Button */}
            <div className="d-flex justify-content-center justify-content-md-end">
              {food.active === 'on' ? (
                <button
                  className="btn btn-warning d-inline-flex align-items-center text-dark"
                  onClick={() => addItemHandler(food, food._id)}
                >
                  <i className="fas fa-shopping-cart me-2"></i> Add To Cart
                </button>
              ) : (
                <button className="btn btn-outline-secondary d-inline-flex align-items-center" disabled>
                  <i className="fas fa-shopping-cart me-2"></i> Out Of Stock
                </button>
              )}
            </div>
          </div>
        </div>



          <div className="container">
            <div className="container">
              <h3 className="text-center" style={{ marginBottom: "20px" }}>
                Reviews
              </h3>
              <div className="grid-4">
                {reviews.length === 0 ? (
                  <div className="review-item">
                    <p>No feedback has been given yet.</p>
                  </div>
                ) : (
                  currentItems.map((item, index) => (
                    <div key={index} className="card border-0 shadow-sm mb-4 rounded-4">
                      <div className="card-body px-4 py-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div className="d-flex align-items-center overflow-hidden" style={{ maxWidth: '70%' }}>
                            <i className="fas fa-user-circle fa-xl text-muted me-2 flex-shrink-0"></i>
                            <span
                              className="fw-medium text-dark text-truncate"
                              style={{ fontSize: '1rem', maxWidth: '100%' }}
                              title={item.name}
                            >
                              {item.name}
                            </span>
                          </div>
                          <div className="flex-shrink-0">
                            <Rating rating={item.rating} />
                          </div>
                        </div>
                  
                        <p className="text-muted small mb-2">
                          <i className="fas fa-calendar-alt me-1"></i>
                          {item.date ? moment(item.date).format("LL") : "Date not available"}
                        </p>
                  
                        <p
                          className="text-body-secondary mb-0"
                          style={{
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            maxHeight: '4.8em',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                          }}
                          title={item.comment}
                        >
                          <i className="fas fa-quote-left me-2 text-secondary"></i>
                          {item.comment ? item.comment : <span className="text-muted">No comment given...</span>}
                        </p>
                      </div>
                    </div>
                  ))
                  
                  
                  
                )}
              </div>
              {reviews.length >= 4 && (
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">>"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel="<<"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination"
                />
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <h3 className="text-center" style={{ marginBottom: "20px" }}>
            Recommended
          </h3>
          <div className="grid-4">
            {recomFoods.slice(0, 4).map((item, index) => (
              <div key={item._id} className="px-2">
            <motion.div
              className="card bg-white border-0 shadow h-100"
              
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
                  {item.active === 'on' ? (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => addItemHandler(item, item._id)}
                    >
                      <i className="fas fa-cart-plus me-1"></i>
                      Add to Cart
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-dark" disabled>
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleFood;
