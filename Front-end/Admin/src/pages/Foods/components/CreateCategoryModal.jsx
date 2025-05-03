import React, { useState } from "react";
import ButtonLoader from "../../../assets/components/ButtonLoader";
import { useToast } from "../../../assets/context/ToastContext";
import axiosInstance from "../../../../config/axios";

const CreateCategoryModal = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { setToast } = useToast();

  const [newCategory, setNewCategory] = useState({
    title: "",
    featured: false,
    active: true,
  });

  const [categoryImage, setCategoryImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setNewCategory({
      ...newCategory,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      
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
    if (!newCategory.title || !categoryImage) {
      setToast({ 
        type: "error", 
        message: "Please enter a category name and select an image" 
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", newCategory.title);
      formData.append("featured", newCategory.featured);
      formData.append("active", newCategory.active);
      formData.append("thumb", categoryImage);

      const response = await axiosInstance.post("/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setToast({ type: "success", message: "Category created successfully" });
        if (onSuccess) onSuccess(newCategory);
        onClose();
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setToast({ 
        type: "error", 
        message: "Failed to create category: " + (error.response?.data?.message || error.message) 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#050A36] mb-4">
          Add New Category
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Category Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Category Name *
            </label>
            <input
              type="text"
              name="title"
              value={newCategory.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter category name"
              required
            />
          </div>
          
          {/* Category Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Category Image *
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
                  alt="Category preview" 
                  className="w-40 h-40 object-cover rounded" 
                />
              </div>
            )}
          </div>

          {/* Featured & Active Toggles */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={newCategory.featured}
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
                checked={newCategory.active}
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
              {loading ? <ButtonLoader /> : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryModal;