import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";
import ConfirmModal from "../../assets/components/ConfirmModal";
import DetailsModal from "../../assets/components/DetailsModal";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  const categories = [
    {
      thumb: "category1.jpg",
      title: "Fast Food",
      featured: "on",
      active: "on",
      date: "2025-03-28T10:00:00Z",
    },
    {
      thumb: "category2.jpg",
      title: "Desserts",
      featured: "off",
      active: "on",
      date: "2025-03-28T12:00:00Z",
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const closePopup = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Categories</h1>
      <Link
        to="/new-category"
        className="mb-4 inline-block px-4 py-2 bg-[#0D1552] text-white rounded hover:bg-[#1A237E]"
      >
        Add Category
      </Link>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category, index) => (
          <Card
            key={index}
            thumb={category.thumb}
            title={category.title}
            onClick={() => handleCategoryClick(category)}
            actions={
              <>
                <button
                  // to={`/edit-category/${index}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="ri-edit-box-fill"></i>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmModal(true);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="ri-delete-bin-5-fill"></i>
                </button>
              </>
            }
          />
        ))}
      </motion.div>

      {selectedCategory && (
        <DetailsModal
          isOpen={!!selectedCategory}
          onClose={closePopup}
          title="Category Details"
          image={`/categories/${selectedCategory.thumb}`}
          details={{
            Title: selectedCategory.title,
            Featured: selectedCategory.featured === "on" ? "Yes" : "No",
            Active: selectedCategory.active === "on" ? "Yes" : "No",
            Date: new Date(selectedCategory.date).toLocaleString(),
          }}
        />
      )}
       <ConfirmModal
        isOpen={confirmModal}
        onConfirm={() => setConfirmModal(false)}
        onCancel={() => setConfirmModal(false)}
        message="Do you really want to delete customer?"
      />
    </div>
  );
};

export default Category;
