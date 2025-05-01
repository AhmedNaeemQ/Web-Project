import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../../config/axios";
import ConfirmModal from "../../assets/components/ConfirmModal";
import DetailsModal from "../../assets/components/DetailsModal";
import Loader from "../../assets/components/Loader";
import { useToast } from "../../assets/context/ToastContext";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { setToast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setToast({ type: "error", message: "Failed to fetch orders" });
    } finally {
      setLoading(false);
    }
  };

  const tableVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closePopup = () => {
    setSelectedOrder(null);
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/orders/${id}`, { status });
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
      setToast({ type: "success", message: `Order status updated to ${status}` });
    } catch (error) {
      console.error("Error updating order status:", error);
      setToast({ type: "error", message: "Failed to update order status" });
    }
  };

  const handleDelete = async () => {
    if (!orderToDelete) {
      setToast({ type: "error", message: "Order not found for deletion." });
      return;
    }
    
    try {
      await axiosInstance.delete(`/orders/${orderToDelete._id}`);
      setOrders(orders.filter(order => order._id !== orderToDelete._id));
      setConfirmModal(false);
      setOrderToDelete(null);
      setToast({ type: "success", message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      setToast({ type: "error", message: "Failed to delete order" });
    }
  };

  const confirmDelete = (e, order) => {
    e.stopPropagation();
    setOrderToDelete(order);
    setConfirmModal(true);
  };

  const handleEdit = (e, order) => {
    e.stopPropagation();
    setCurrentOrder(order);
    setEditModalOpen(true);
  };

  const isOrderEditable = (status) => {
    return status !== "Delivered" && status !== "Completed";
  };

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Orders</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
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
                orders.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                    onClick={() => handleOrderClick(item)}
                  >
                    <td className="p-4">
                      <Link
                        to={`/customers/${item.customer_id}`}
                        className="text-[#0D1552] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.customer_name}
                      </Link>
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/orders/${item._id}`}
                        className="text-[#0D1552] hover:underline"
                        onClick={(e) => e.stopPropagation()}
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
                            : item.status === "Completed"
                            ? "bg-purple-500" 
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
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.delivery_man_name}
                        </Link>
                      )}
                    </td>
                    <td className="p-4 flex gap-2">
                      {isOrderEditable(item.status) && (
                        <>
                          <button
                            onClick={(e) => handleEdit(e, item)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <i className="ri-edit-box-fill"></i>
                          </button>
                          <button
                            onClick={(e) => confirmDelete(e, item)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <i className="ri-delete-bin-5-fill"></i>
                          </button>
                        </>
                      )}
                      {/* Status update dropdown */}
                      {isOrderEditable(item.status) && (
                        <div className="relative ml-2">
                          <select
                            className="bg-[#E9F0F7] text-sm rounded p-1 border border-gray-300"
                            value={item.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateOrderStatus(item._id, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="Ordered">Ordered</option>
                            <option value="Processing">Processing</option>
                            <option value="OnDelivery">On Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      )}

      {selectedOrder && (
        <DetailsModal
          isOpen={!!selectedOrder}
          onClose={closePopup}
          title="Order Details"
          details={{
            Customer: selectedOrder.customer_name,
            "Order ID": selectedOrder.orderID,
            "Order Date": new Date(selectedOrder.order_date).toLocaleString(),
            Email: selectedOrder.email,
            Phone: selectedOrder.phone,
            Address: `${selectedOrder.address}, ${selectedOrder.city}`,
            "Total Foods": selectedOrder.total_foods,
            "Total Quantity": selectedOrder.total_quantity,
            "Delivery Cost": `Rs ${selectedOrder.deliveryCost}`,
            "Total Price": `Rs ${selectedOrder.total_price}`,
            Payment: selectedOrder.payment,
            Status: selectedOrder.status,
            "Delivery Man": selectedOrder.delivery_man_name === "NaN" ? "Not Assigned" : selectedOrder.delivery_man_name,
          }}
          items={selectedOrder.items}
        />
      )}
      
      <ConfirmModal
        isOpen={confirmModal}
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmModal(false);
          setOrderToDelete(null);
        }}
        message="Do you really want to delete this order?"
      />
    </div>
  );
};

export default Orders;