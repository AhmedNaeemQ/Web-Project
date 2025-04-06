import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";
import ConfirmModal from "../../assets/components/ConfirmModal";
import DetailsModal from "../../assets/components/DetailsModal";

const DeliveryRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  const deliveryRiders = [
    {
      thumb: "rider1.jpg",
      name: "John Doe",
      rating: 4.5,
      totalReviews: 120,
      pendingOrders: 5,
      completeOrders: 50,
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City",
      joiningDate: "2025-03-28T10:00:00Z",
    },
    {
      thumb: "rider2.jpg",
      name: "Jane Smith",
      rating: 4.2,
      totalReviews: 80,
      pendingOrders: 3,
      completeOrders: 40,
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "456 Elm St, City",
      joiningDate: "2025-03-28T12:00:00Z",
    },
  ];

  const handleRiderClick = (rider) => {
    setSelectedRider(rider);
  };

  const closePopup = () => {
    setSelectedRider(null);
  };

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Delivery Riders</h1>
      <Link
        to="/new-rider"
        className="mb-4 inline-block px-4 py-2 bg-[#0D1552] text-white rounded hover:bg-[#1A237E]"
      >
        Add Delivery Rider
      </Link>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {deliveryRiders.map((rider, index) => (
          <Card
            key={index}
            thumb={rider.thumb}
            title={rider.name}
            subtitle={`Rating: ${rider.rating.toFixed(1)} (${rider.totalReviews} reviews)`}
            onClick={() => handleRiderClick(rider)}
            actions={
              <>
                <Link
                  to={`/delivery-riders`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="ri-eye-fill"></i>
                </Link>
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

      {selectedRider && (
        <DetailsModal
          isOpen={!!selectedRider}
          onClose={closePopup}
          title="Rider Details"
          image={`/delivery-riders/${selectedRider.thumb}`}
          details={{
            Name: selectedRider.name,
            Rating: `${selectedRider.rating.toFixed(1)} (${selectedRider.totalReviews} reviews)`,
            "Pending Orders": selectedRider.pendingOrders,
            "Complete Orders": selectedRider.completeOrders,
            Email: selectedRider.email,
            Phone: selectedRider.phone,
            Address: selectedRider.address,
            "Joining Date": new Date(selectedRider.joiningDate).toLocaleString(),
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

export default DeliveryRiders;