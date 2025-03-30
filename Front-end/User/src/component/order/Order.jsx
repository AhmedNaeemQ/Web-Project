import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./order.css";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import { v4 as uuid } from "uuid";

function Order() {
  // ADD TO CART
  const {
    isEmpty,
    cartTotal,
    totalItems,
    items,
    totalUniqueItems,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const claerCart = () => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        emptyCart();
      }
    });
  };

  // PLACE ORDER
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  var deliveryCost = 0;

  if (city === "") {
    deliveryCost = 0;
  } else if (city === "Gulberg") {
    deliveryCost = 80;
  } else {
    deliveryCost = 100;
  }



  const submitHandler = (e) => {
    e.preventDefault();
    if (!isEmpty) {
      if (true) {
        Swal.fire({
          icon: "success",
          text: "Order placed successfully.",
        });

      } else {
        window.location.href = "/login";
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Please, select any food.",
      });
    }
  };

  return (
    <>
      <PageHeader title="Order" />
      <section className="order">
        <div className="container">
          <div className="order-items">
            <table>
              <tr>
                <th>Food</th>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
              {isEmpty ? (
                <tr>
                  <td colSpan="6">
                    Your Cart is Empty.{" "}
                    <Link to="/foods/" className="btn-primary danger-btn">
                      Brows Foods
                    </Link>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr>
                    <td>
                      <Link to={"/foods/" + item._id}>
                        <img src={"img/food/p2.jpg"} alt="" />
                      </Link>
                    </td>
                    <td>
                      <Link to={"/foods/" + item._id}>{item.title}</Link>
                    </td>
                    <td>Rs {item.price}</td>
                    <td>
                      <button
                        className="btn-primary"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>{" "}
                      <span className="item-qty">{item.quantity}</span>{" "}
                      <button
                        className="btn-primary"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </td>
                    <td>Rs {item.itemTotal}</td>
                    <td>
                      <Link
                        onClick={() => removeItem(item.id)}
                        class="danger-btn"
                      >
                        Remove
                      </Link>
                    </td>
                  </tr>
                ))
              )}
              {!isEmpty && (
                <>
                  <tr className="bold">
                    <td></td>
                    <td></td>
                    <td>Sub-Total</td>
                    <td>{totalItems}</td>
                    <td>Rs {cartTotal}</td>
                    <td>
                      <Link className="btn-danger" onClick={() => claerCart()}>
                        Clear All
                      </Link>
                    </td>
                  </tr>
                  <tr className="bold">
                    <td colSpan="2">Delivery Cost</td>
                    <td>Rs{deliveryCost}</td>
                    <td>Total Cost</td>
                    <td>Rs {cartTotal && cartTotal + deliveryCost}</td>
                    <td></td>
                  </tr>
                </>
              )}
              <tr>
                <td colSpan="6">
                  <span className="nb">
                    (Delivery only available within Lahore )
                  </span>
                </td>
              </tr>
            </table>
          </div>
          <div className="">
            <form className="order-form" onSubmit={submitHandler}>
              <fieldset>
                <legend>Delivery Details</legend>
                <div className="order-label">Phone Number</div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone..."
                  required
                />
                <div className="order-label">Email</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                />
                <div class="order-label">City</div>
                <select
                  name="category"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  class="form-select"
                  required
                >
                  <option value="" selected>
                    Select
                  </option>
                  <option value="Gulberg">Gulberg</option>
                  <option value="DHA">DHA</option>
                  <option value="Johar Town">Johar Town</option>
                  <option value="Model Town">Model Town</option>
                  <option value="Bahria Town">Bahria Town</option>
                  <option value="Iqbal Town">Iqbal Town</option>
                  <option value="Garden Town">Garden Town</option>
                  <option value="Wapda Town">Wapda Town</option>
                  <option value="Valencia">Valencia Town</option>
                </select>
                <div class="order-label">Address</div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address..."
                  required
                />
                <div className="order-label">Payment Method</div>
                <input
                  type="radio"
                  name="payment"
                  value="Credit Card"
                  onChange={(e) => setPayment(e.target.value)}
                  required
                />{" "}
                Credit Card <br />
                <input
                  type="radio"
                  name="payment"
                  value="Bank Transfer"
                  onChange={(e) => setPayment(e.target.value)}
                  required
                />{" "}
                Bank Transfer <br />
                <input
                  type="radio"
                  name="payment"
                  value="Cash On Delivery"
                  onChange={(e) => setPayment(e.target.value)}
                  required
                />{" "}
                Cash On Delivery <br />
                <input
                  type="submit"
                  name="submit"
                  value="Confirm Order"
                  className="btn-primary"
                />
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Order;
