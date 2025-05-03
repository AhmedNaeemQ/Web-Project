import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "../../assets/context/ToastContext";
import axiosInstance from "../../../config/axios";
import Loader from "../../assets/components/Loader";
import Card from "../../assets/components/Card";
import ConfirmModal from "../../assets/components/ConfirmModal";
import DetailsModal from "../../assets/components/DetailsModal";
import CreateFoodModal from "./components/CreateFoodModal";
import CreateCategoryModal from "./components/CreateCategoryModal";
import EditFoodModal from "./components/EditFood";

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);
  const [currentFood, setCurrentFood] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesModal, setCategoriesModal] = useState(false);
  const { setToast } = useToast();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/foods");
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
      setToast({ type: "error", message: "Failed to load food items" });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setToast({ type: "error", message: "Failed to load categories" });
    }
  };

  const handleCreateSuccess = () => {
    fetchFoods(); // Refresh the food list
    setCreateModal(false);
    setToast({ type: "success", message: "Food item created successfully" });
  };

  const handleFoodClick = (food) => {
    setSelectedFood(food);
  };

  const closePopup = () => {
    setSelectedFood(null);
  };

  const confirmDelete = (e, food) => {
    e.stopPropagation();
    setFoodToDelete(food);
    setConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!foodToDelete) return;

    try {
      await axiosInstance.delete(
        `/foods/${foodToDelete._id}?thumb=${foodToDelete.thumb}`
      );
      setFoods(foods.filter((food) => food._id !== foodToDelete._id));
      setConfirmModal(false);
      setFoodToDelete(null);
      setToast({ type: "success", message: "Food item deleted successfully" });
    } catch (error) {
      console.error("Error deleting food item:", error);
      setToast({ type: "error", message: "Failed to delete food item" });
    }
  };

  const handleEdit = (e, food) => {
    e.stopPropagation();
    setCurrentFood(food);
    setEditModal(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#050A36]">Foods</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setCategoriesModal(true)}
            className="px-4 py-2 bg-[#0D1552] text-white rounded-md flex items-center gap-2 hover:bg-[#1A237E] transition-colors"
          >
            <i className="ri-add-line"></i>
            Add Category
          </button>
          <button
            onClick={() => setCreateModal(true)}
            className="px-4 py-2 bg-[#0D1552] text-white rounded-md flex items-center gap-2 hover:bg-[#1A237E] transition-colors"
          >
            <i className="ri-add-line"></i>
            Add Food
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {foods.length === 0 ? (
            <div className="col-span-full text-center p-8 bg-white rounded-lg shadow">
              No food items found!
            </div>
          ) : (
            categories.map((category) => (
              <div className="">
                <h1 className="font-bold text-xl text-blue-500 my-8">
                  {category.title}
                </h1>
                <div className="flex gap-4 flex-wrap">
                  {foods.map(
                    (food) =>
                      food.category === category._id && (
                        <Card
                          key={food._id}
                          thumb={`${import.meta.env.VITE_API_URL}/foods/${food.thumb}`}
                          title={food.title}
                          price={food.price}
                          description={
                            food.description || "No description available"
                          }
                          onClick={() => handleFoodClick(food)}
                          rating={food.rating || 0}
                          totalReviews={food.totalReviews || 0}
                          badges={[
                            food.featured && {
                              text: "Featured",
                              color: "yellow",
                            },
                            {
                              text: food.active ? "Active" : "Inactive",
                              color: food.active ? "green" : "red",
                            },
                          ].filter(Boolean)}
                          actions={
                            <>
                              <button
                                onClick={(e) => handleEdit(e, food)}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <i className="ri-edit-box-fill"></i>
                              </button>
                              <button
                                onClick={(e) => confirmDelete(e, food)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <i className="ri-delete-bin-5-fill"></i>
                              </button>
                            </>
                          }
                        />
                      )
                  )}
                </div>
              </div>
            ))
          )}
        </motion.div>
      )}

      {/* Details Modal - Conditional Rendering */}
      {selectedFood && (
        <DetailsModal
          isOpen={true}
          onClose={closePopup}
          title="Food Details"
          image={`/uploads/foods/${selectedFood.thumb}`}
          details={{
            Title: selectedFood.title,
            Price: `Rs ${selectedFood.price}`,
            Description: selectedFood.description || "No description",
            Category: selectedFood.category?.name || "Uncategorized",
            Rating: selectedFood.rating
              ? `${selectedFood.rating.toFixed(1)} (${
                  selectedFood.totalReviews || 0
                } reviews)`
              : "No ratings yet",
            Featured: selectedFood.featured ? "Yes" : "No",
            Active: selectedFood.active ? "Yes" : "No",
            "Added On": new Date(selectedFood.createdAt).toLocaleString(),
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
            setFoodToDelete(null);
          }}
          message={`Do you really want to delete "${foodToDelete?.title}"?`}
        />
      )}

      {/* Create Food Modal */}
      {createModal && (
        <CreateFoodModal
          onClose={() => setCreateModal(false)}
          onSuccess={handleCreateSuccess}
          categories={categories}
        />
      )}

      {categoriesModal && (
        <CreateCategoryModal
          onClose={() => setCategoriesModal(false)}
          onSuccess={(newCategory) => {
            setCategoriesModal(false);
            setCategories((prev) => [...prev, newCategory]);
          }}
        />
      )}

      {/* Edit Food Modal */}
      {editModal && (
        <EditFoodModal
          food={currentFood}
          onClose={() => setEditModal(false)}
          onSuccess={(updatedFood) => {
            setEditModal(false);
            setFoods((prev) =>
              prev.map((food) =>
                food._id === updatedFood._id ? updatedFood : food
              )
            );
            setToast({
              type: "success",
              message: "Food item updated successfully",
            });
          }}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Foods;
