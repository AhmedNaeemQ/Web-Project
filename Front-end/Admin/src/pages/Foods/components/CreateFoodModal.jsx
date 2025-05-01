import React, { useState, useEffect } from "react";
import ButtonLoader from "../../../assets/components/ButtonLoader";
import { useToast } from "../../../assets/context/ToastContext";
import axiosInstance from "../../../../config/axios";

const CreateFoodModal = ({ onClose, onSuccess, categories = [] }) => {
  const [loading, setLoading] = useState(false);
  const { setToast } = useToast();
  const [previewImage, setPreviewImage] = useState(null);

  const [newFood, setNewFood] = useState({
    title: "",
    price: "",
    featured: false,
    active: true,
    category: "",
    description: "",
  });

  const [foodImage, setFoodImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setNewFood({
      ...newFood,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!newFood.title || !newFood.price || !newFood.category || !foodImage) {
      setToast({ 
        type: "error", 
        message: "Please fill in all required fields and select an image" 
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", newFood.title);
      formData.append("price", newFood.price);
      formData.append("featured", newFood.featured);
      formData.append("active", newFood.active);
      formData.append("category", newFood.category);
      formData.append("description", newFood.description);
      formData.append("thumb", foodImage);

      const response = await axiosInstance.post("/foods", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setToast({ type: "success", message: "Food item created successfully" });
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error creating food item:", error);
      setToast({ 
        type: "error", 
        message: "Failed to create food item: " + (error.response?.data?.message || error.message) 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#050A36] mb-4">
          Add New Food Item
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Food Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Food Title *
            </label>
            <input
              type="text"
              name="title"
              value={newFood.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter food title"
              required
            />
          </div>
          
          {/* Food Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Food Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {previewImage && (
              <div className="mt-2">
                <img 
                  src={previewImage} 
                  alt="Food preview" 
                  className="w-40 h-40 object-cover rounded" 
                />
              </div>
            )}
          </div>

          {/* Price & Category (side by side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Price (Rs) *
              </label>
              <input
                type="number"
                name="price"
                value={newFood.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter price"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category *
              </label>
              <select
                name="category"
                value={newFood.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded bg-white"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={newFood.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Describe the food item"
              rows="3"
            />
          </div>
          
          {/* Featured & Active Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={newFood.featured}
                onChange={handleInputChange}
                className="w-5 h-5 mr-2"
              />
              <label htmlFor="featured" className="text-gray-700">
                Mark as Featured
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={newFood.active}
                onChange={handleInputChange}
                className="w-5 h-5 mr-2"
              />
              <label htmlFor="active" className="text-gray-700">
                Set as Active
              </label>
            </div>
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
              {loading ? <ButtonLoader /> : "Create Food"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFoodModal;