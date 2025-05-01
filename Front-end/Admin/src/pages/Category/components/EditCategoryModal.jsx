import React, { useState, useEffect } from "react";
import ButtonLoader from "../../../assets/components/ButtonLoader";
import { useToast } from "../../../assets/context/ToastContext";
import axiosInstance from "../../../../config/axios";

const EditCategoryModal = ({ onClose, category, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { setToast } = useToast();
  const [newImage, setNewImage] = useState(null);

  const [editedCategory, setEditedCategory] = useState({
    title: "",
    featured: false,
    active: true,
  });

  useEffect(() => {
    if (category) {
      setEditedCategory({
        title: category.title || "",
        featured: category.featured || false,
        active: category.active !== undefined ? category.active : true,
      });
    }
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setEditedCategory({
      ...editedCategory,
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
    if (!editedCategory.title) {
      setToast({ 
        type: "error", 
        message: "Please enter a category title" 
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", editedCategory.title);
      formData.append("featured", editedCategory.featured);
      formData.append("active", editedCategory.active);
      
      // Only append image if a new one was selected
      if (newImage) {
        formData.append("thumb", newImage);
      }

      const response = await axiosInstance.put(
        `/categories/${category._id}`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        // Create updated category object with all fields
        const updatedCategory = {
          ...category,
          ...editedCategory,
          // If new image, the backend will return the new filename
          thumb: response.data?.thumb || category.thumb
        };
        
        onSuccess(updatedCategory);
        onClose();
      }
    } catch (error) {
      console.error("Error updating category:", error);
      setToast({ 
        type: "error", 
        message: "Failed to update category: " + (error.response?.data?.message || error.message) 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#050A36] mb-4">
          Edit Category: {category?.title}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Category Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Category Title *
            </label>
            <input
              type="text"
              name="title"
              value={editedCategory.title}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter category title"
              required
            />
          </div>
          
          {/* Category Image */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Category Image
            </label>
            <div className="flex items-center space-x-4 mb-2">
              <img 
                src={`/uploads/categories/${category?.thumb}`} 
                alt={category?.title} 
                className="w-24 h-24 object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-category.jpg";
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
                  alt="Category preview" 
                  className="w-24 h-24 object-cover rounded" 
                />
              </div>
            )}
          </div>
          
          {/* Featured & Active Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={editedCategory.featured}
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
                checked={editedCategory.active}
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

export default EditCategoryModal;