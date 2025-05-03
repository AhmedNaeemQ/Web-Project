import React, { useState, useEffect } from "react";
import ButtonLoader from "../../../assets/components/ButtonLoader";
import { useToast } from "../../../assets/context/ToastContext";
import axiosInstance from "../../../../config/axios";

const EditRiderModal = ({ onClose, rider, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { setToast } = useToast();
  const [newImage, setNewImage] = useState(null);

  const [riderData, setRiderData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    active: true,
  });

  useEffect(() => {
    if (rider) {
      setRiderData({
        name: rider.name || "",
        email: rider.email || "",
        phone: rider.phone || "",
        address: rider.address || "",
        password: "",
        confirmPassword: "",
        active: rider.active !== undefined ? rider.active : true,
      });
    }
  }, [rider]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRiderData({
      ...riderData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);

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
    if (!riderData.name || !riderData.email || !riderData.phone) {
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

    // Only check passwords if they're provided (optional field during edit)
    if (riderData.password) {
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
      formData.append("phone", riderData.phone);
      formData.append("address", riderData.address || "");
      formData.append("active", riderData.active);

      // Only include password if it was changed
      if (riderData.password) {
        formData.append("password", riderData.password);
      }

      // Only append image if a new one was selected
      if (newImage) {
        formData.append("thumb", newImage);
      }

      const response = await axiosInstance.put(
        `/delivery-men/${rider._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            cthumb: rider.thumb, // Send current thumb for backend to delete old image
          },
        }
      );

      if (response.status === 200) {
        setToast({
          type: "success",
          message: "Delivery rider updated successfully",
        });

        // Create updated rider object
        const updatedRider = {
          ...rider,
          name: riderData.name,
          email: riderData.email,
          phone: riderData.phone,
          address: riderData.address,
          active: riderData.active,
          // If there's a new image and the API returned it, use that or keep the old one
          thumb: response.data?.thumb || rider.thumb,
        };

        if (onSuccess) {
          onSuccess(updatedRider);
        }
        onClose();
      }
    } catch (error) {
      console.error("Error updating delivery rider:", error);
      setToast({
        type: "error",
        message:
          "Failed to update delivery rider: " +
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
          Edit Delivery Rider: {rider?.name}
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

            {/* Password (Optional on Edit) */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                New Password (Optional)
              </label>
              <input
                type="password"
                name="password"
                value={riderData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Leave blank to keep current password"
                minLength="6"
              />
              <div className="text-xs text-gray-500 mt-1">
                Leave blank to keep current password
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={riderData.confirmPassword}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Confirm new password"
                disabled={!riderData.password}
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

            {/* Active Status */}
            <div className="mb-4 col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={riderData.active}
                  onChange={handleInputChange}
                  className="w-5 h-5 mr-2"
                />
                <label htmlFor="active" className="text-gray-700">
                  Active Account
                </label>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Profile Image
            </label>
            <div className="flex items-center space-x-4 mb-2">
              <img
                src={
                  rider?.thumb
                    ? `/uploads/delivery-men/${rider.thumb}`
                    : "/placeholder-user.png"
                }
                alt={rider?.name}
                className="w-24 h-24 object-cover rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-user.png";
                }}
              />
              <div className="text-sm text-gray-500">Current profile image</div>
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
              {loading ? <ButtonLoader /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRiderModal;
