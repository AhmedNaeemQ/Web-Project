import React, { useState, useEffect } from "react";
import ButtonLoader from "../../../assets/components/ButtonLoader";
import { useToast } from "../../../assets/context/ToastContext";
import axiosInstance from "../../../../config/axios";

const EditCustomerModal = ({ onClose, customer, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { setToast } = useToast();
  const [newImage, setNewImage] = useState(null);

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    active: true,
  });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (customer) {
      setCustomerData({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
        active: customer.active !== undefined ? customer.active : true,
      });
      setImageError(false);
    }
  }, [customer]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomerData({
      ...customerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!customerData.name || !customerData.email) {
      setToast({ type: "error", message: "Name and email are required" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
      setToast({
        type: "error",
        message: "Please enter a valid email address",
      });
      return false;
    }

    if (customerData.phone) {
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(customerData.phone.replace(/[^0-9]/g, ""))) {
        setToast({
          type: "error",
          message: "Please enter a valid phone number",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", customerData.name);
      formData.append("email", customerData.email);
      formData.append("phone", customerData.phone || "");
      formData.append("address", customerData.address || "");
      formData.append("active", customerData.active);

      if (newImage) {
        formData.append("thumb", newImage);
      }

      const response = await axiosInstance.put(
        `/customers/${customer._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            cthumb: customer.thumb,
          },
        }
      );

      if (response.status === 200) {
        const updatedCustomer = {
          ...customer,
          ...customerData,
          thumb: response.data?.thumb || customer.thumb,
        };

        if (onSuccess) {
          onSuccess(updatedCustomer);
        }
        onClose();
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      setToast({
        type: "error",
        message:
          "Failed to update customer: " +
          (error.response?.data?.message || error.message),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#050A36] mb-4">
          Edit Customer: {customer?.name}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={customerData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={customerData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={customerData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter phone number"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={customerData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter address"
              />
            </div>

            <div className="mb-4 col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={customerData.active}
                  onChange={handleInputChange}
                  className="w-5 h-5 mr-2"
                />
                <label htmlFor="active" className="text-gray-700">
                  Active Account
                </label>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Profile Image
            </label>
            <div className="flex items-center space-x-4 mb-2">
              <img
                src={
                  !imageError && customer?.thumb
                    ? `/uploads/customers/${customer.thumb}`
                    : "/placeholder-user.png"
                }
                alt={customer?.name || "Customer"}
                className="w-24 h-24 object-cover rounded-full"
                onError={() => setImageError(true)}
              />
              <div className="text-sm text-gray-500">
                {imageError ? "Using default image" : "Current profile image"}
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="text-xs text-gray-500 mt-1">
              Leave empty to keep the current image
            </div>
            {previewImage && (
              <div className="mt-2">
                <div className="text-sm text-gray-500 mb-1">
                  New image preview:
                </div>
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            )}
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

export default EditCustomerModal;
