import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      customer_name: "John Doe",
      customer_id: "123",
      orderID: "ORD001",
      total_foods: 3,
      total_quantity: 5,
      total_price: 1500,
      payment: "Paid",
      status: "Delivered",
      order_date: "2025-03-28T10:00:00Z",
      accept_time: "2025-03-28T10:30:00Z",
      exp_time: "2025-03-28T11:00:00Z",
      delivery_man_name: "Alex Rider",
      delivery_man_id: "456",
    },
    {
      customer_name: "Jane Smith",
      customer_id: "124",
      orderID: "ORD002",
      total_foods: 2,
      total_quantity: 4,
      total_price: 1200,
      payment: "Pending",
      status: "Ordered",
      order_date: "2025-03-28T12:00:00Z",
      accept_time: null,
      exp_time: "NaN",
      delivery_man_name: "NaN",
      delivery_man_id: null,
    },
  ];

  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closePopup = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Orders</h1>
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#0D1552] text-white">
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Items</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Total Price</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Delivery Man</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td className="text-center p-4" colSpan="9">
                  No items found!
                </td>
              </tr>
            ) : (
              orders.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                  onClick={() => handleOrderClick(item)}
                >
                  <td className="p-4">
                    <Link
                      to={`/customers/${item.customer_id}`}
                      className="text-[#0D1552] hover:underline"
                    >
                      {item.customer_name}
                    </Link>
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/orders/${item.orderID}`}
                      className="text-[#0D1552] hover:underline"
                    >
                      {item.orderID}
                    </Link>
                  </td>
                  <td className="p-4">{item.total_foods}</td>
                  <td className="p-4">{item.total_quantity}</td>
                  <td className="p-4">Rs {item.total_price}</td>
                  <td className="p-4">{item.payment}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.status === "Ordered"
                          ? "bg-yellow-500"
                          : item.status === "OnDelivery"
                          ? "bg-blue-500"
                          : item.status === "Cancelled"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {item.delivery_man_name === "NaN" ? (
                      "N/A"
                    ) : (
                      <Link
                        to={`/delivery-men/${item.delivery_man_id}`}
                        className="text-[#0D1552] hover:underline"
                      >
                        {item.delivery_man_name}
                      </Link>
                    )}
                  </td>
                  <td className="p-4 flex gap-2">
                    <Link
                      to={`/orders/${item.orderID}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="ri-edit-box-fill"></i>
                    </Link>
                    <button className="text-red-500 hover:text-red-700">
                      <i className="ri-delete-bin-5-fill"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Popup for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-[#050A36] mb-4">
              Order Details
            </h2>
            <p>
              <strong>Customer:</strong> {selectedOrder.customer_name}
            </p>
            <p>
              <strong>Order ID:</strong> {selectedOrder.orderID}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(selectedOrder.order_date).toLocaleString()}
            </p>
            <p>
              <strong>Accept Time:</strong>{" "}
              {selectedOrder.accept_time
                ? new Date(selectedOrder.accept_time).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Exp Time:</strong>{" "}
              {selectedOrder.exp_time === "NaN" ? "N/A" : selectedOrder.exp_time}
            </p>
            <p>
              <strong>Delivery Man:</strong>{" "}
              {selectedOrder.delivery_man_name === "NaN"
                ? "N/A"
                : selectedOrder.delivery_man_name}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-[#0D1552] text-white rounded hover:bg-[#1A237E]"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;