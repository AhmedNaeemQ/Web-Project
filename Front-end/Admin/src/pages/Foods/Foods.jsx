import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";
import ConfirmModal from "../../assets/components/ConfirmModal";
import DetailsModal from "../../assets/components/DetailsModal";

const Food = () => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

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
                <button onClick={(e) => {
                    e.stopPropagation();
                    setConfirmModal(true);
                  }} className="text-red-500 hover:text-red-700">
                  <i className="ri-delete-bin-5-fill"></i>
                </button>
              </>
            }
          />
        ))}
      </motion.div>

      {selectedFood && (
        <DetailsModal
          isOpen={!!selectedFood}
          onClose={closePopup}
          title="Food Details"
          image={`/foods/${selectedFood.thumb}`}
          details={{
            Title: selectedFood.title,
            Price: `Rs ${selectedFood.price}`,
            Description: selectedFood.description,
            Rating: `${selectedFood.rating.toFixed(1)} (${selectedFood.totalReviews} reviews)`,
            Category: selectedFood.category,
            Featured: selectedFood.featured === "on" ? "Yes" : "No",
            Active: selectedFood.active === "on" ? "Yes" : "No",
            Date: new Date(selectedFood.date).toLocaleString(),
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

export default Food;