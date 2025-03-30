import React, {useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./food.css";
import { Link} from "react-router-dom";
import axios from "axios";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Rating from "../common/rating/Rating";
import moment from "moment";
import ReactPaginate from "react-paginate";

const food = {
  _id: "1",
  title: "Margherita Pizza",
  description: "A classic Italian pizza with fresh basil, mozzarella, and tomato sauce.",
  price: 1200,
  category: "Pizza",
  rating: 4.5,
  totalReviews: 32,
  thumb: "margherita-pizza.jpg",
  active: "on",
};

// HARDCODED REVIEWS
const reviews = [
  { name: "Ali Khan", rating: 5, date: "2025-03-25T10:00:00Z", comment: "Delicious and fresh!" },
  { name: "Sara Ahmed", rating: 4, date: "2025-03-27T15:30:00Z", comment: "Good but salty." },
  { name: "Hamza Raza", rating: 3, date: "2025-03-28T08:20:00Z", comment: "Average quality." },
  { name: "Sara Ahmed", rating: 4, date: "2025-03-27T15:30:00Z", comment: "Good but salty." },
  { name: "Hamza Raza", rating: 3, date: "2025-03-28T08:20:00Z", comment: "Average quality." },
  { name: "Sara Ahmed", rating: 4, date: "2025-03-27T15:30:00Z", comment: "Good but salty." },
  { name: "Hamza Raza", rating: 3, date: "2025-03-28T08:20:00Z", comment: "Average quality." }
];

// HARDCODED RECOMMENDED FOODS
const recomFoods = [
  { _id: "2", title: "Pepperoni Pizza", price: 1400, rating: 4.7, totalReviews: 28, thumb: "pepperoni-pizza.jpg", active: "on",description: "A classic Italian pizza with fresh basil, mozzarella, and tomato sauce." },
  { _id: "3", title: "BBQ Chicken Pizza", price: 1500, rating: 4.6, totalReviews: 40, thumb: "bbq-chicken-pizza.jpg", active: "on",description: "A classic Italian pizza with fresh basil, mozzarella, and tomato sauce." },
  { _id: "4", title: "Vegetable Supreme", price: 1100, rating: 4.3, totalReviews: 25, thumb: "vegetable-supreme.jpg", active: "off", description: "A classic Italian pizza with fresh basil, mozzarella, and tomato sauce." },
  { _id: "5", title: "Cheese Burst Pizza", price: 1600, rating: 4.8, totalReviews: 35, thumb: "cheese-burst-pizza.jpg", active: "on", description: "A classic Italian pizza with fresh basil, mozzarella, and tomato sauce." }
];


const SingleFood = () => {


  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = reviews?.slice(itemOffset, endOffset);
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



  // ADD-TO-CART
  const { addItem } = useCart();
  const addItemHandlar = (item, id) => {
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
      <PageHeader title={food.title} />
      <section className="food single-food">
        <div className="container">
          <div className="single-food-item grid-2">
            <div className="left">
              <img src={"/img/food/p1.jpg"} alt={food.title} />
            </div>
            <div className="right">
              <h3>{food.title}</h3>
              <p>{food.description}</p>
              <div className="single-order-form">
                <ul>
                  <li>
                    <span>Price</span>
                    <h4>Rs {food.price}</h4>
                  </li>
                  <li>
                    <span>Category</span>
                    <h4>{food.category}</h4>
                  </li>

                  <li>
                    <span>Reviews</span>
                    <h4>
                      <Rating rating={food.rating} />
                      <span>({food.totalReviews})</span>
                    </h4>
                  </li>

                  <li>
                    <span>Status</span>
                    <h4>
                      {food.active === "on" ? "Available" : "Unavailable"}
                    </h4>
                  </li>

                  <li>
                    {food.active === "on" ? (
                      <Link
                        className="btn-primary"
                        onClick={() => {
                          addItemHandlar(food, food._id);
                        }}
                      >
                        <i className="fas fa-shopping-cart"></i> Add To Cart
                      </Link>
                    ) : (
                      <Link className="btn-primary disableLink">
                        <i className="fas fa-shopping-cart"></i> Out Of Stock
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="single-food-item">
            <div className="all-review">
              <h3 className="text-center" style={{ marginBottom: "20px" }}>
                REVIEWS
              </h3>
              <div className="grid-4">
                {reviews.length === 0 ? (
                  <div className="review-item">
                    <p>No feedback has been given yet.</p>
                  </div>
                ) : (
                  currentItems.map((item, index) => (
                    <div key={index} className="review-item">
                      <div className="grid-2">
                        <h5 className="name bold">{item.name}</h5>
                        <Rating rating={item.rating} />
                      </div>
                      <p className="date">
                        {item.date && moment(item.date).format("lll")}
                      </p>
                      <p className="content">
                        {item.comment ? item.comment : "No comment given..."}
                      </p>
                    </div>
                  ))
                )}
              </div>
              {reviews.length >= 4 && (
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">>"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={4}
                  pageCount={pageCount}
                  previousLabel="<<"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination"
                />
              )}
            </div>
          </div>
        </div>
        <div className="single-food-item container">
          <h3 className="text-center" style={{ marginBottom: "20px" }}>
            RECOMMENDED FOODS
          </h3>
          <div className="grid-4">
            {recomFoods?.slice(0, 4).map((item, index) => (
              <div key={index} className="items shadow">
                <div className="img">
                  <img
                    src={"/img/food/s1.jpg" }
                    alt="Pizza"
                    className="img-responsive img-curve"
                  />
                </div>
                <div className="text text-center">
                  <h4>
                    <Link to={"/foods/" + item._id}>{item.title}</Link>
                  </h4>
                  <h5>
                    <Rating rating={item.rating} />
                    <span>({item.totalReviews})</span>
                  </h5>
                  <p>{item.description?.slice(0, 50)}...</p>
                  <h5>Rs {item.price}</h5>
                  <div className="flexSB">
                    <Link to={"/foods/" + item._id} className="btn-primary">
                      <i className="fas fa-eye"></i> View Detail
                    </Link>
                    {item.active === "on" ? (
                      <Link
                        className="btn-primary"
                        onClick={() => {
                          addItemHandlar(item, item._id);
                        }}
                      >
                        <i className="fas fa-shopping-cart"></i> Add To Cart
                      </Link>
                    ) : (
                      <Link className="btn-primary disableLink">
                        <i className="fas fa-shopping-cart"></i> Stock Out
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleFood;
