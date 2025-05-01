import React, { useEffect, useState } from "react";
import ButtonLoader from "../../../assets/components/ButtonLoader";
import { useToast } from "../../../assets/context/ToastContext";
import axiosInstance from "../../../../config/axios";

const EditOrderModal = ({onClose, order, onUpdate }) => {
  const [editedOrder, setEditedOrder] = useState(order);
  const [loading, setLoading] = useState(false);
  const { setToast } = useToast();

  useEffect(() => {
    setEditedOrder(order);
    console.log("Edited Order:", order);
  }, [order]);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Ensure quantity can only decrease, not increase
    const originalItem = order.items.find((item) => item._id === itemId);
    if (originalItem && newQuantity > originalItem.quantity) {
      setToast({
        type: "error",
        message: "You can only decrease item quantity, not increase it",
      });
      return;
    }

    // Update the quantity
    const updatedItems = editedOrder.items.map((item) =>
      item._id === itemId
        ? { ...item, quantity: parseInt(newQuantity, 10) }
        : item
    );

    // Recalculate totals
    let totalQuantity = 0;
    let totalPrice = 0;

    updatedItems.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });

    // Add delivery cost to total price
    totalPrice += editedOrder.deliveryCost;

    setEditedOrder({
      ...editedOrder,
      items: updatedItems,
      total_quantity: totalQuantity,
      total_price: totalPrice,
    });
  };

  const handleStatusChange = (e) => {
    setEditedOrder({
      ...editedOrder,
      status: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `/orders/${editedOrder._id}`,
        editedOrder
      );

      if (response.status === 200) {
        setToast({ type: "success", message: "Order updated successfully" });
        onUpdate(editedOrder); // Update local state
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error updating order:", error);
      setToast({
        type: "error",
        message:
          "Failed to update order: " +
          (error.response?.data?.message || error.message),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#050A36] mb-4">
          Edit Order #{editedOrder.orderID}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Order Status
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded bg-[#E9F0F7]"
              value={editedOrder.status}
              onChange={handleStatusChange}
            >
              <option value="Ordered">Ordered</option>
              <option value="Processing">Processing</option>
              <option value="OnDelivery">On Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Items
            </label>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {editedOrder.items?.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.thumb && (
                            <div className="flex-shrink-0 h-10 w-10 mr-2">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={`/uploads/foods/${item.thumb}`}
                                alt={item.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/placeholder-food.jpg";
                                }}
                              />
                            </div>
                          )}
                          <div>{item.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Rs {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          max={
                            order.items.find((i) => i._id === item._id).quantity
                          }
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item._id, e.target.value)
                          }
                          className="w-16 p-1 border rounded text-center"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Rs {item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between">
              <span className="font-semibold">Total Items:</span>
              <span>{editedOrder.items?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total Quantity:</span>
              <span>{editedOrder.total_quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Delivery Cost:</span>
              <span>Rs {editedOrder.deliveryCost}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>Rs {editedOrder.total_price}</span>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0D1552] text-white rounded hover:bg-[#1A237E]"
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderModal;
