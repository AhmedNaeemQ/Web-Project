import React, { useState } from "react";
import ButtonLoader from "../../../assets/components/ButtonLoader";
import { useToast } from "../../../assets/context/ToastContext";
import axiosInstance from "../../../../config/axios";

const CreateRiderModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { setToast } = useToast();

  const [riderData, setRiderData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [riderImage, setRiderImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRiderData({
      ...riderData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRiderImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    // Check for required fields
    if (
      !riderData.name ||
      !riderData.email ||
      !riderData.password ||
      !riderData.phone
    ) {
      setToast({
        type: "error",
        message: "Please fill in all required fields",
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(riderData.email)) {
      setToast({
        type: "error",
        message: "Please enter a valid email address",
      });
      return false;
    }

    // Check password length
    if (riderData.password.length < 6) {
      setToast({
        type: "error",
        message: "Password must be at least 6 characters long",
      });
      return false;
    }

    // Check if passwords match
    if (riderData.password !== riderData.confirmPassword) {
      setToast({ type: "error", message: "Passwords do not match" });
      return false;
    }

    // Validate phone number (simple validation)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(riderData.phone.replace(/[^0-9]/g, ""))) {
      setToast({ type: "error", message: "Please enter a valid phone number" });
      return false;
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
      formData.append("name", riderData.name);
      formData.append("email", riderData.email);
      formData.append("password", riderData.password);
      formData.append("phone", riderData.phone);
      formData.append("address", riderData.address || "");

      if (riderImage) {
        formData.append("thumb", riderImage);
      }

      const response = await axiosInstance.post("/delivery-men", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        setToast({
          type: "success",
          message: "Delivery rider added successfully",
        });
        if (onSuccess) {
          onSuccess(response.data);
        }
        onClose();
      }
    } catch (error) {
      console.error("Error creating delivery rider:", error);
      if (error.response?.data?.message === "Email already exists") {
        setToast({
          type: "error",
          message: "This email is already registered",
        });
      } else {
        setToast({
          type: "error",
          message:
            "Failed to create delivery rider: " +
            (error.response?.data?.message || error.message),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#050A36] mb-4">
          Add New Delivery Rider
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={riderData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={riderData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={riderData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter password"
                minLength="6"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={riderData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Confirm password"
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={riderData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={riderData.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter address"
              />
            </div>
          </div>

          {/* Profile Image */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
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
              {loading ? <ButtonLoader /> : "Add Rider"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRiderModal;
