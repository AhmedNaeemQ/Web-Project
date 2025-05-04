import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Rating from "../common/rating/Rating";
import ReactPaginate from "react-paginate";
import { motion } from 'framer-motion';

const FoodItem = ({ foods }) => {
  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = foods.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(foods.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % foods.length;
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

  // ADD-TO-CART
  const { addItem } = useCart();
  const addItemHandler = (item, id) => {
    item.id = id;
    addItem(item);
    Swal.fire({
      icon: "success",
      text: item.title + " Added.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      <div className="grid-4">
        {currentItems.length === 0 ? (
          <h3 className="text-center">No items found!</h3>
        ) : (
          currentItems.map((item, index) => (
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

            
          ))
        )}
      </div>

      {foods.length >= itemsPerPage + 1 && (
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
    </>
  );
};

export default FoodItem;
