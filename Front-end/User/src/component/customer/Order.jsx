import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import moment from "moment";
import Profile from "./Profile";
import Rating from "../common/rating/Rating";

const order = {
  orderID: "123456",
  status: "Delivered",
  payment: "Paid",
  order_date: new Date().toISOString(),
  accept_time: new Date().toISOString(),
  exp_time: "30 mins",
  total_foods: 3,
  total_quantity: 5,
  total_price: 1500,
  deliveryCost: 50,
  delivery_man_id: "1",
  deliveryManReview: "No",
};

const items = [
  {
    _id: "1",
    title: "Burger",
    price: 500,
    quantity: 2,
    itemTotal: 1000,
    thumb: "burger.jpg",
    review: "No",
  },
  {
    _id: "2",
    title: "Pizza",
    price: 500,
    quantity: 1,
    itemTotal: 500,
    thumb: "pizza.jpg",
    review: "Yes",
  },
];

const deliveryMan = {
  name: "John Doe",
  thumb: "john.jpg",
  rating: 4.5,
  totalReviews: 120,
  completeOrders: 300,
  phone: "1234567890",
  email: "john@example.com",
};

const Order = () => {


    return (
      <>
        <PageHeader title="Dashboard" />
        <section className="dashboard">
          <div className="container padding">
            <Profile />
            <div className="dashboard-content">
              <div className="order order-details">
                <div className="order-items">
                  <h3 className="text-center">Order Details</h3>
                  <div className="heading-border"></div>
                  <table>
                    <tr>
                      <th>Thumb</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total_price</th>
                    </tr>
                    {items.length === 0 ? (
                      <tr>
                        <td className="text-center" colSpan="13">
                          No items found!
                        </td>
                      </tr>
                    ) : (
                      items.map((val, index) => (
                        <tr key={index}>
                          <td>
                            <Link to={"/foods/" + val._id}>
                              <img
                                src={"/foods/" + val.thumb}
                                alt={val.title}
                              />
                            </Link>
                          </td>
                          <td>
                            <Link to={"/foods/" + val._id}>{val.title}</Link>
                          </td>
                          <td>Rs {val.price}</td>
                          <td>{val.quantity}</td>
                          <td>{val.itemTotal}</td>
                        </tr>
                      ))
                    )}
                    <tr className="bold">
                      <td colSpan="2">Total Items: {order.total_foods}</td>
                      <td colSpan="2">Total Qty: {order.total_quantity}</td>
                      <td>
                        Sub-Total: Rs {order.total_price - order.deliveryCost}
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="3">Delviery Cost: Rs {order.deliveryCost}</th>
                      <th colSpan="2">Total Cost: Rs {order.total_price}</th>
                    </tr>
                  </table>
                  <div className="grid-3">
                    <div className="order-summury">
                      <h5>Order Status</h5>
                      <ul>
                        <li>
                          <b>Order ID: </b> {order.orderID}
                        </li>
                        <li>
                          <b>Status: </b>
                          <span
                            className={
                              (order.status === "Ordered" && "btn-order") ||
                              (order.status === "OnDelivery" &&
                                "btn-on-delv") ||
                              (order.status === "Cancelled" && "btn-cncl") ||
                              (order.status === "Delivered" && "btn-delv")
                            }
                          >
                            {order.status}
                          </span>
                        </li>
                        <li>
                          <b>Payment: </b> {order.payment}
                        </li>
                        <li>
                          <b>Order Date: </b>
                          {order.order_date
                            ? moment(order.order_date).format("lll")
                            : "NaN"}
                        </li>
                        <li>
                          <b>Accept Time: </b>
                          {order.accept_time
                            ? moment(order.accept_time).format("lll")
                            : "NaN"}
                        </li>
                        <li>
                          <b>Expected Time: </b>
                          {order.exp_time === "0" ? "NaN" : order.exp_time}
                        </li>
                      </ul>
                      {!order.status ||
                      order.status === "Ordered" ||
                      order.status === "Delivered" ||
                      order.status === "Cancelled" ? (
                        <Link className="btn-primary disableLink">ACCEPT</Link>
                      ) : (
                        <Link
                          onClick={() => acceptHandler()}
                          className="btn-primary"
                        >
                          ACCEPT
                        </Link>
                      )}{" "}
                      {order.status === "Ordered" ? (
                        <Link
                          onClick={() => deleteHandler()}
                          className="btn-danger"
                        >
                          CANCEL
                        </Link>
                      ) : (
                        <Link className="btn-danger disableLink">CANCEL</Link>
                      )}
                    </div>
                    {order.delivery_man_id !== "NaN" && (
                      <div className="order-summury">
                        <h5>Delivery Man</h5>
                        <ul>
                          <li className="delivery-man-details">
                            <img
                              src={"/delivery-men/" + deliveryMan.thumb}
                              alt={deliveryMan.name}
                            />
                          </li>
                          <li title="Police Verified">
                            <b>Name: </b> {deliveryMan.name}{" "}
                            <i className="fa-solid fa-shield"></i>
                          </li>
                          <li>
                            <b>Rating: </b>
                            <Rating rating={deliveryMan.rating} /> (
                            {deliveryMan.totalReviews})
                          </li>
                          <li title="Police Verified">
                            <b>Complete Orders: </b>{" "}
                            {deliveryMan.completeOrders}
                          </li>
                          <li>
                            <b>Phone: </b>
                            <a href={"tel:" + deliveryMan.phone}>
                              {deliveryMan.phone}
                            </a>
                          </li>
                          <li>
                            <b>Email: </b>
                            <a href={"mailto:" + deliveryMan.email}>
                              {deliveryMan.email}
                            </a>
                          </li>
                          <li>
                            <b>Police Emergency: </b>
                            <a href="tel:999" className="btn-delv">
                              Click For Call
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                    {order.status === "Delivered" && (
                      <div className="order-summury">
                        <h5>Review for Delivery Man</h5>
                        {order.deliveryManReview === "No" ? (
                          <form onSubmit={deliveryManReview}>
                            <p>Rating</p>
                            <select
                              name="rating"
                              value={deliveryManRating}
                              onChange={(e) =>
                                setDeliveryManRating(e.target.value)
                              }
                              required
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </select>
                            <p>Comment</p>
                            <textarea
                              rows="2"
                              value={deliveryManComment}
                              onChange={(e) =>
                                setDeliveryManComment(e.target.value)
                              }
                              placeholder="Write a comment..."
                            ></textarea>
                            <button className="btn-primary">Submit</button>
                          </form>
                        ) : (
                          <p className="review-item text-center">
                            Review submitted.
                          </p>
                        )}

                        <h5>Review for Foods</h5>
                        <table>
                          <tr>
                            <th>Thumb</th>
                            <th>Title</th>
                            <th>Review</th>
                          </tr>
                          {items.length === 0 ? (
                            <tr>
                              <td className="text-center" colSpan="13">
                                No items found!
                              </td>
                            </tr>
                          ) : (
                            items.map((val, index) => (
                              <tr key={index}>
                                <td>
                                  <Link to={"/foods/" + val._id}>
                                    <img
                                      src={"/foods/" + val.thumb}
                                      alt={val.title}
                                    />
                                  </Link>
                                </td>
                                <td>
                                  <Link to={"/foods/" + val._id}>
                                    {val.title}
                                  </Link>
                                </td>
                                <td>
                                  {val.review === "Yes" ? (
                                    <i className="fas fa-check-circle"></i>
                                  ) : (
                                    <Link
                                      className="success-btn"
                                      onClick={() => {
                                        foodReviewHandler(val._id);
                                      }}
                                    >
                                      Review
                                    </Link>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};

export default Order;
