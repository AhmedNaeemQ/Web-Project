import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";

const DeliveryRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);

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
                <button className="text-red-500 hover:text-red-700">
                  <i className="ri-delete-bin-5-fill"></i>
                </button>
              </>
            }
          />
        ))}
      </motion.div>

      {/* Popup for Delivery Rider Details */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-[#050A36] mb-4">
              Rider Details
            </h2>
            <img
              src={`/delivery-riders/${selectedRider.thumb}`}
              alt={selectedRider.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <p>
              <strong>Name:</strong> {selectedRider.name}
            </p>
            <p>
              <strong>Rating:</strong> {selectedRider.rating.toFixed(1)} (
              {selectedRider.totalReviews} reviews)
            </p>
            <p>
              <strong>Pending Orders:</strong> {selectedRider.pendingOrders}
            </p>
            <p>
              <strong>Complete Orders:</strong> {selectedRider.completeOrders}
            </p>
            <p>
              <strong>Email:</strong> {selectedRider.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedRider.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedRider.address}
            </p>
            <p>
              <strong>Joining Date:</strong>{" "}
              {new Date(selectedRider.joiningDate).toLocaleString()}
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

export default DeliveryRiders;