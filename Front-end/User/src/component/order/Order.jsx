import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./order.css";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import axios from "axios";
import { v4 as uuid } from "uuid";
import Banner from "../common/banner/Banner";

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
  const orderID = uuid().slice(0, 8);
  const customer_id = Cookies.get("customer");
  const customer_name = Cookies.get("customerName");
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

  // GET CUSTOMER DETAILS
  const id = Cookies.get("customer");
  useEffect(() => {
    const fetchCustomer = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/customers/${id}`);
      setPhone(data.phone);
      setEmail(data.email);
      setAddress(data.address);
    };
    if(customer_id){
      fetchCustomer();
    }
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isEmpty) {
      if (customer_id) {
        let data = {
          orderID,
          customer_id,
          customer_name,
          items,
          email,
          phone,
          city,
          address,
          payment,
          total_foods: totalUniqueItems,
          total_quantity: totalItems,
          deliveryCost: deliveryCost,
          total_price: cartTotal + deliveryCost,
        };
        axios
          .post(`http://localhost:3000/api/orders`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: response.data.message,
              showConfirmButton: false,
              timer: 500,
            });
            emptyCart();
            window.location.href = "/customer/dashboard";
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong.",
            });
          });
      } else {
        window.location.href = "/login";
      }
    } else {
      Swal.fire({
        icon: "error",
        text: "Please, select any food item.",
      });
    }
  };

  return (
    <>
      {/* <PageHeader title="Order" /> */}
      <Banner title="Order" subtitle="Place Order"/>
      <section className="order">
        <div className="container">
          <div className="order-items">
            <table>
              <tr>
                <th>Food</th>
                <th>Title</th>
                <th>Price</th>
                <th colSpan={2}>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
              {isEmpty ? (
                <>
                <tr>
                  <td colSpan="8">
                    Your Cart is Empty.
                  </td>
                </tr>
                  <tr>
                  <td colSpan="8">
                    <Link to="/foods/" className="btn btn-warning">
                      Browse Cuisines
                    </Link>
                  </td>
                </tr>
                </>
              ) : (
                items.map((item) => (
                  <tr>
                    <td>
                      <Link to={"/foods/" + item._id}>
                        <img src={"/foods/" + item.thumb} alt="" />
                      </Link>
                    </td>
                    <td>
                      <Link to={"/foods/" + item._id}>{item.title}</Link>
                    </td>
                    <td>Rs. {item.price}</td>
                    <td colSpan={2}>
                      <button
                        className="btn-primary"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      > -
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
                    <td>Rs. {item.itemTotal}</td>
                    <td>
                      <Link
                        onClick={() => removeItem(item.id)}
                        class="btn btn-danger"
                      >
                        <i className="fas fa-trash"/>
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
                    <td colSpan={2}>Sub-Total</td>
                    <td>{totalItems}</td>
                    <td>Rs. {cartTotal}</td>
                    <td>
                      <Link className="btn btn-danger" onClick={() => claerCart()}>
                        Clear
                      </Link>
                    </td>
                  </tr>
                  <tr className="bold">
                    <td></td>
                    <td colSpan={2}>Delivery Cost</td>
                    <td>Rs.{deliveryCost}</td>
                    <td>Total Cost</td>
                    <td>Rs. {cartTotal && cartTotal + deliveryCost}</td>
                  </tr>
                </>
              )}
              <tr>
                <td colSpan="8">
                  <span className="nb">
                    (Delivery cost Rs 80 for inside of Gulberg and Rs 100 for
                    outside of Gulberg )
                  </span>
                </td>
              </tr>
            </table>
          </div>
          <div className="container">
            <form className="order-form px-5 py-5" onSubmit={submitHandler}>
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
                <div class="order-label">Area</div>
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
                  <option value="Johar Town">Johar Town</option>
                  <option value="Defence">Defence</option>
                  <option value="Valencia Town">Valencia Town</option>
                  <option value="Bahria Town">Bahria Town</option>
                  <option value="Lake City">Lake City</option>
                  <option value="Walton">Walton</option>
                  <option value="Township  ">Township </option>
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
              </fieldset>
              <button
                  type="submit"
                  name="submit"
                  className="mt-5 btn btn-warning"
                >Confirm Order
                </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Order;
