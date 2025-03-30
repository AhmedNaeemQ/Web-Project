import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import moment from "moment";
import Profile from "./Profile";
import ReactPaginate from "react-paginate";


const orders = [
  {
    _id: "1",
    orderID: "ORD-1001",
    total_foods: "Biryani, Chicken Karahi",
    total_quantity: 3,
    total_price: 1200,
    payment: "Paid",
    status: "Ordered",
    order_date: "2025-03-20T12:00:00Z",
    accept_time: "2025-03-20T12:30:00Z",
    exp_time: "2025-03-20T13:00:00Z",
    customer_id: "cust_001",
    delivery_man_id: "dm_001",
  },
  {
    _id: "2",
    orderID: "ORD-1002",
    total_foods: "Pizza, Fries",
    total_quantity: 2,
    total_price: 1500,
    payment: "Pending",
    status: "OnDelivery",
    order_date: "2025-03-21T14:00:00Z",
    accept_time: "2025-03-21T14:30:00Z",
    exp_time: "2025-03-21T15:00:00Z",
    customer_id: "cust_002",
    delivery_man_id: "dm_002",
  },
  {
    _id: "3",
    orderID: "ORD-1003",
    total_foods: "Burger, Soft Drink",
    total_quantity: 1,
    total_price: 500,
    payment: "Paid",
    status: "Delivered",
    order_date: "2025-03-19T10:00:00Z",
    accept_time: "2025-03-19T10:20:00Z",
    exp_time: "2025-03-19T10:45:00Z",
    customer_id: "cust_003",
    delivery_man_id: "dm_003",
  },
  {
    _id: "4",
    orderID: "ORD-1004",
    total_foods: "Pasta, Garlic Bread",
    total_quantity: 2,
    total_price: 900,
    payment: "Paid",
    status: "Cancelled",
    order_date: "2025-03-18T16:00:00Z",
    accept_time: null,
    exp_time: "0",
    customer_id: "cust_004",
    delivery_man_id: "dm_004",
  },
];


const Dashboard = () => {


  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

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



    return (
      <>
        <PageHeader title="Dashboard" />
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
                      <th>Total_price</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Order_Date</th>
                      <th>Accept_Time</th>
                      <th>Expected_Time</th>
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
                  {orders.length >= 2 && (
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
  
};

export default Dashboard;
