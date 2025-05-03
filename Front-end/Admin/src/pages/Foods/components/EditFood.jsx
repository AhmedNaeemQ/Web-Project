import React, { useState, useEffect } from "react";
import ButtonLoader from "../../../assets/components/ButtonLoader";
import { useToast } from "../../../assets/context/ToastContext";
import axiosInstance from "../../../../config/axios";

const EditFoodModal = ({ onClose, food, onSuccess, categories }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { setToast } = useToast();
  const [newImage, setNewImage] = useState(null);

  const [editedFood, setEditedFood] = useState({
    title: "",
    price: "",
    description: "",
    featured: false,
    active: true,
    category: "",
  });

  useEffect(() => {
    if (food) {
      setEditedFood({
        title: food.title || "",
        price: food.price || 0,
        description: food.description || "",
        featured: food.featured || false,
        active: food.active !== undefined ? food.active : true,
        category: food.category || "",
      });
    }
  }, [food]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setEditedFood({
      ...editedFood,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!editedFood.title || !editedFood.price || !editedFood.category) {
      setToast({ 
        type: "error", 
        message: "Please fill in all required fields" 
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", editedFood.title);
      formData.append("price", editedFood.price);
      formData.append("featured", editedFood.featured);
      formData.append("active", editedFood.active);
      formData.append("category", editedFood.category);
      formData.append("description", editedFood.description || "");
      
      // Only append image if a new one was selected
      if (newImage) {
        formData.append("thumb", newImage);
      }

      const response = await axiosInstance.put(`/foods/${food._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 204) {
        setToast({ type: "success", message: "Food item updated successfully" });
        if (onSuccess) {
          // Create updated food object with all fields
          const updatedFood = {
            ...food,
            ...editedFood,
            // If new image, the backend will return the new filename
            thumb: response.data?.thumb || food.thumb
          };
          onSuccess(updatedFood);
        }
        onClose();
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      setToast({ 
        type: "error", 
        message: "Failed to update food item: " + (error.response?.data?.message || error.message) 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#050A36] mb-4">
          Edit Food: {food?.title}
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
              value={editedFood.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter food title"
              required
            />
          </div>
          
          {/* Food Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Food Image
            </label>
            <div className="flex items-center space-x-4 mb-2">
              <img 
                src={`/uploads/foods/${food?.thumb}`} 
                alt={food?.title} 
                className="w-24 h-24 object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-food.jpg";
                }}
              />
              <div className="text-sm text-gray-500">Current image</div>
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
                <div className="text-sm text-gray-500 mb-1">New image preview:</div>
                <img 
                  src={previewImage} 
                  alt="Food preview" 
                  className="w-24 h-24 object-cover rounded" 
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
                value={editedFood.price}
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
                value={editedFood.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded bg-white"
                required
              >
                <option value="">Select Category</option>
                {categories && categories.map(category => (
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
              value={editedFood.description}
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
                checked={editedFood.featured}
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
                checked={editedFood.active}
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
              {loading ? <ButtonLoader /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFoodModal;