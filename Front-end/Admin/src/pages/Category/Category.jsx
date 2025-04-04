import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
                <Link
                  to={`/edit-category/${index}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="ri-edit-box-fill"></i>
                </Link>
                <button className="text-red-500 hover:text-red-700">
                  <i className="ri-delete-bin-5-fill"></i>
                </button>
              </>
            }
          />
        ))}
      </motion.div>

      {/* Popup for Category Details */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-[#050A36] mb-4">
              Category Details
            </h2>
            <img
              src={`/categories/${selectedCategory.thumb}`}
              alt={selectedCategory.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <p>
              <strong>Title:</strong> {selectedCategory.title}
            </p>
            <p>
              <strong>Featured:</strong>{" "}
              {selectedCategory.featured === "on" ? "Yes" : "No"}
            </p>
            <p>
              <strong>Active:</strong>{" "}
              {selectedCategory.active === "on" ? "Yes" : "No"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedCategory.date).toLocaleString()}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-[#0D1552] text-white rounded hover:bg-[#1A237E]"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;