import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";
import ConfirmModal from "../../assets/components/ConfirmModal";
import DetailsModal from "../../assets/components/DetailsModal";
import Loader from "../../assets/components/Loader";
import { useToast } from "../../assets/context/ToastContext";
import axiosInstance from "../../../config/axios";
import CreateRiderModal from "./components/CreateRiderModal";
import EditRiderModal from "./components/EditRiderModal";

const DeliveryRiders = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRider, setSelectedRider] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [riderToDelete, setRiderToDelete] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentRider, setCurrentRider] = useState(null);

  const { setToast } = useToast();

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/delivery-men");
      setRiders(response.data);
    } catch (error) {
      console.error("Error fetching delivery riders:", error);
      setToast({
        type: "error",
        message: response.data.message || "Failed to fetch delivery riders",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRiderClick = (rider) => {
    setSelectedRider(rider);
  };

  const closePopup = () => {
    setSelectedRider(null);
  };

  const confirmDelete = (e, rider) => {
    e.stopPropagation();
    setRiderToDelete(rider);
    setConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!riderToDelete) return;

    try {
      await axiosInstance.delete(`/delivery-men/${riderToDelete._id}`);
      setRiders(riders.filter((rider) => rider._id !== riderToDelete._id));
      setConfirmModal(false);
      setRiderToDelete(null);
      setToast({
        type: "success",
        message: "Delivery rider deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting delivery rider:", error);
      setToast({ type: "error", message: "Failed to delete delivery rider" });
    }
  };

  const handleEdit = (e, rider) => {
    e.stopPropagation();
    setCurrentRider(rider);
    setEditModal(true);
  };

  const handleEditSuccess = (updatedRider) => {
    setRiders(
      riders.map((rider) =>
        rider._id === updatedRider._id ? updatedRider : rider
      )
    );
    setEditModal(false);
  };

  const handleCreateSuccess = (newRider) => {
    if (newRider) {
      setRiders([newRider, ...riders]);
      setToast({
        type: "success",
        message: "Delivery rider added successfully",
      });
    }
  };

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#050A36]">Delivery Riders</h1>
        <button
          onClick={() => setCreateModal(true)}
          className="px-4 py-2 bg-[#0D1552] text-white rounded-md flex items-center gap-2 hover:bg-[#1A237E] transition-colors"
        >
          <i className="ri-add-line"></i>
          Add Delivery Rider
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {riders.length === 0 ? (
            <div className="col-span-full text-center p-8 bg-white rounded-lg shadow">
              No delivery riders found!
            </div>
          ) : (
            riders.map((rider) => (
              <Card
                key={rider._id}
                thumb={
                  rider.thumb
                    ? `/uploads/riders/${rider.thumb}`
                    : "/placeholder-user.jpg"
                }
                title={rider.name}
                subtitle={`${rider.phone}`}
                description={rider.email}
                onClick={() => handleRiderClick(rider)}
                badges={[
                  {
                    text: rider.active ? "Active" : "Inactive",
                    color: rider.active ? "green" : "red",
                  },
                ]}
                actions={
                  <>
                    <button
                      onClick={(e) => handleEdit(e, rider)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <i className="ri-edit-box-fill"></i>
                    </button>
                    <button
                      onClick={(e) => confirmDelete(e, rider)}
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

      {selectedRider && (
        <DetailsModal
          isOpen={true}
          onClose={closePopup}
          title="Rider Details"
          image={
            selectedRider.thumb
              ? `/uploads/riders/${selectedRider.thumb}`
              : "/placeholder-user.jpg"
          }
          details={{
            Name: selectedRider.name,
            Email: selectedRider.email,
            Phone: selectedRider.phone,
            Address: selectedRider.address || "Not provided",
            "Pending Orders": selectedRider.pendingOrders || 0,
            "Completed Orders": selectedRider.completeOrders || 0,
            Rating: selectedRider.rating
              ? `${selectedRider.rating.toFixed(1)} (${
                  selectedRider.totalReviews || 0
                } reviews)`
              : "No ratings yet",
            "Joining Date": new Date(selectedRider.createdAt).toLocaleString(),
            Status: selectedRider.active ? "Active" : "Inactive",
          }}
        />
      )}

      {confirmModal && (
        <ConfirmModal
          isOpen={true}
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirmModal(false);
            setRiderToDelete(null);
          }}
          message={`Do you really want to delete ${riderToDelete?.name}?`}
        />
      )}

      {createModal && (
        <CreateRiderModal
          onClose={() => setCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {editModal && (
        <EditRiderModal
          onClose={() => setEditModal(false)}
          rider={currentRider}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default DeliveryRiders;
