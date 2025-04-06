import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";

const Food = () => {
  const [selectedFood, setSelectedFood] = useState(null);

  const foods = [
    {
      thumb: "food1.jpg",
      title: "Pizza",
      price: 500,
      description: "Delicious cheese pizza with fresh toppings.",
      rating: 4.5,
      totalReviews: 120,
      category: "Fast Food",
      featured: "on",
      active: "on",
      date: "2025-03-28T10:00:00Z",
    },
    {
      thumb: "food2.jpg",
      title: "Burger",
      price: 300,
      description: "Juicy beef burger with fresh lettuce and tomato.",
      rating: 4.2,
      totalReviews: 80,
      category: "Fast Food",
      featured: "off",
      active: "on",
      date: "2025-03-28T12:00:00Z",
    },
  ];

  const handleFoodClick = (food) => {
    setSelectedFood(food);
  };

  const closePopup = () => {
    setSelectedFood(null);
  };

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Foods</h1>
      <Link
        to="/new-food"
        className="mb-4 inline-block px-4 py-2 bg-[#0D1552] text-white rounded hover:bg-[#1A237E]"
      >
        Add Food
      </Link>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {foods.map((food, index) => (
          <Card
            key={index}
            thumb={food.thumb}
            title={food.title}
            price={food.price}
            description={food.description}
            onClick={() => handleFoodClick(food)}
            actions={
              <>
                <button
                  // to={`/edit-food/${index}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="ri-edit-box-fill"></i>
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <i className="ri-delete-bin-5-fill"></i>
                </button>
              </>
            }
          />
        ))}
      </motion.div>

      {/* Popup for Food Details */}
      {selectedFood && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-[#050A36] mb-4">
              Food Details
            </h2>
            <img
              src={`/foods/${selectedFood.thumb}`}
              alt={selectedFood.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <p>
              <strong>Title:</strong> {selectedFood.title}
            </p>
            <p>
              <strong>Price:</strong> Rs {selectedFood.price}
            </p>
            <p>
              <strong>Description:</strong> {selectedFood.description}
            </p>
            <p>
              <strong>Rating:</strong> {selectedFood.rating.toFixed(1)} (
              {selectedFood.totalReviews} reviews)
            </p>
            <p>
              <strong>Category:</strong> {selectedFood.category}
            </p>
            <p>
              <strong>Featured:</strong>{" "}
              {selectedFood.featured === "on" ? "Yes" : "No"}
            </p>
            <p>
              <strong>Active:</strong>{" "}
              {selectedFood.active === "on" ? "Yes" : "No"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedFood.date).toLocaleString()}
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

export default Food;