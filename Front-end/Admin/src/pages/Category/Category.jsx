import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";
import ConfirmModal from "../../assets/components/ConfirmModal";
import DetailsModal from "../../assets/components/DetailsModal";
import CreateCategoryModal from "../Foods/components/CreateCategoryModal";
import Loader from "../../assets/components/Loader";
import { useToast } from "../../assets/context/ToastContext";
import axiosInstance from "../../../config/axios";
import EditCategoryModal from "./components/EditCategoryModal";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [categoriesModal, setCategoriesModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { setToast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setToast({ type: "error", message: "Failed to load categories" });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const closePopup = () => {
    setSelectedCategory(null);
  };

  const handleCreateSuccess = (newCategory) => {
    setCategoriesModal(false);
    setCategories((prev) => [...prev, newCategory]);
    setToast({ type: "success", message: "Category created successfully" });
  };

  const handleEdit = (e, category) => {
    e.stopPropagation();
    setCurrentCategory(category);
    setEditModal(true);
  };

  const confirmDelete = (e, category) => {
    e.stopPropagation();
    setCategoryToDelete(category);
    setConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await axiosInstance.delete(`/categories/${categoryToDelete._id}?thumb=${categoryToDelete.thumb}`);
      setCategories(categories.filter(category => category._id !== categoryToDelete._id));
      setConfirmModal(false);
      setCategoryToDelete(null);
      setToast({ type: "success", message: "Category deleted successfully" });
    } catch (error) {
      console.error("Error deleting category:", error);
      setToast({ type: "error", message: "Failed to delete category" });
    }
  };

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#050A36]">Categories</h1>
        <button
          onClick={() => {setCategoriesModal(true)}}
          className="px-4 py-2 bg-[#0D1552] text-white rounded-md flex items-center gap-2 hover:bg-[#1A237E] transition-colors"
        >
          <i className="ri-add-line"></i>
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {categories.length === 0 ? (
            <div className="col-span-full text-center p-8 bg-white rounded-lg shadow">
              No categories found!
            </div>
          ) : (
            categories.map((category) => (
              <Card
                key={category._id}
                thumb={`/uploads/categories/${category.thumb}`}
                title={category.title}
                onClick={() => handleCategoryClick(category)}
                badges={[
                  category.featured && { text: "Featured", color: "yellow" },
                  { text: category.active ? "Active" : "Inactive", color: category.active ? "green" : "red" }
                ].filter(Boolean)}
                actions={
                  <>
                    <button
                      onClick={(e) => handleEdit(e, category)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="ri-edit-box-fill"></i>
                    </button>
                    <button
                      onClick={(e) => confirmDelete(e, category)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="ri-delete-bin-5-fill"></i>
                    </button>
                  </>
                }
              />
            ))
          )}
        </motion.div>
      )}

      {/* Category Details Modal */}
      {selectedCategory && (
        <DetailsModal
          isOpen={true}
          onClose={closePopup}
          title="Category Details"
          image={`/uploads/categories/${selectedCategory.thumb}`}
          details={{
            Title: selectedCategory.title,
            Featured: selectedCategory.featured ? "Yes" : "No",
            Active: selectedCategory.active ? "Yes" : "No",
            "Created On": new Date(selectedCategory.createdAt).toLocaleString(),
            "Last Updated": new Date(selectedCategory.updatedAt).toLocaleString(),
          }}
        />
      )}

      {/* Confirm Delete Modal */}
      {confirmModal && (
        <ConfirmModal
          isOpen={true}
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirmModal(false);
            setCategoryToDelete(null);
          }}
          message={`Do you really want to delete "${categoryToDelete?.title}" category?`}
        />
      )}

      {/* Create Category Modal */}
      {categoriesModal && (
        <CreateCategoryModal 
          onClose={() => setCategoriesModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {/* Dummy Edit Category Modal */}
      {editModal && (
        <EditCategoryModal
          onClose={() => setEditModal(false)}
          category={currentCategory}
          onSuccess={(updatedCategory) => {
            setCategories((prev) =>
              prev.map((cat) => (cat._id === updatedCategory._id ? updatedCategory : cat))
            );
            setEditModal(false);
            setToast({ type: "success", message: "Category updated successfully" });
          }}
        />)}
    </div>
  );
};

export default Category;