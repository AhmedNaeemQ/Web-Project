import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import Profile from "./Profile";
import ReactPaginate from "react-paginate";
import Banner from "../common/banner/Banner";

const Dashboard = () => {

  const [orders, setOrders] = useState([]);
  const customer_id = Cookies.get("customer");
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get(`/api/admin/orders`);
      const fatchCustomerOrders = data.filter((curData) => {
        return curData.customer_id === customer_id;
      });
      setOrders(fatchCustomerOrders);
    };
    fatchOrders();
  }, []);


  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = orders.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };


  const deleteHandler = (id) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:1000/api/admin/orders/${id}`).catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Order deleted field!",
          });
        });
      }
    });
  };


  const acceptHandler = (id, deliveryManID) => {
    Swal.fire({
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        let updateData = {
          status: "Delivered",
        };
        axios
          .put(`http://localhost:1000/api/admin/orders/${id}`, updateData, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            window.location.href = "/customer/dashboard/" + id;
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Order update failed!",
            });
          });
      }
    });
  };

  if (!Cookies.get("customer")) {
    window.location.href = "/login";
  } else {
    return (
      <>
      <Banner title="Dashboard" subtitle="Customer Portal"/>
        <section className="dashboard main-dashboard">
          <div className="container padding">
            <Profile />
            <div className="dashboard-content">
              <div className="order">
                <div className="order-items">
                  <table>
                    <tr>
                      <th>Order ID</th>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Total Price</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Order_Date</th>
                      <th>Accept Time</th>
                      <th>Expected Time</th>
                      <th>Action</th>
                    </tr>
                    {currentItems.length === 0 ? (
                      <tr>
                        <td className="text-center" colSpan="10">
                          No items found!
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Link to={"/customer/dashboard/" + item._id}>
                              {item.orderID}
                            </Link>
                          </td>
                          <td>{item.total_foods}</td>
                          <td>{item.total_quantity}</td>
                          <td>Rs {item.total_price}</td>
                          <td>{item.payment}</td>
                          <td>
                            <span
                              className={
                                (item.status === "Ordered" && "btn-order") ||
                                (item.status === "OnDelivery" &&
                                  "btn-on-delv") ||
                                (item.status === "Cancelled" && "btn-cncl") ||
                                (item.status === "Delivered" && "btn-delv")
                              }
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>{moment(item.order_date).format("lll")}</td>
                          <td>
                            {item.accept_time
                              ? moment(item.accept_time).format("lll")
                              : "NaN"}
                          </td>
                          <td>
                            {item.exp_time === "0" ? "NaN" : item.exp_time}
                          </td>
                          <td>
                            {item.status === "OnDelivery" && (
                              <Link
                                onClick={() =>
                                  acceptHandler(item._id, item.delivery_man_id)
                                }
                                className="success-btn"
                              >
                                ACCEPT
                              </Link>
                            )}
                            {(item.status === "Delivered" ||
                              item.status === "Cancelled") && (
                              <Link className="success-btn disableLink">
                                ACCEPT
                              </Link>
                            )}
                            {item.status === "Ordered" && (
                              <Link
                                onClick={() => deleteHandler(item._id)}
                                className="danger-btn"
                              >
                                CANCEL
                              </Link>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </table>
                  {orders.length >= 16 && (
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
          </div>
        </section>
      </>
    );
  }
};

export default Dashboard;
