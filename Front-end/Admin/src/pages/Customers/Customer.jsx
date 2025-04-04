import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";

const Customer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      thumb: "customer1.jpg",
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City",
      joiningDate: "2025-03-28T10:00:00Z",
    },
    {
      thumb: "customer2.jpg",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "456 Elm St, City",
      joiningDate: "2025-03-28T12:00:00Z",
    },
  ];

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const closePopup = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Customers</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {customers.map((customer, index) => (
          <Card
            key={index}
            thumb={customer.thumb}
            title={customer.name}
            subtitle={`Email: ${customer.email}`}
            onClick={() => handleCustomerClick(customer)}
            actions={
              <>
                <Link
                  to={`/customers/${index}`}
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

      {/* Popup for Customer Details */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-[#050A36] mb-4">
              Customer Details
            </h2>
            <img
              src={`/customers/${selectedCustomer.thumb}`}
              alt={selectedCustomer.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <p>
              <strong>Name:</strong> {selectedCustomer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedCustomer.phone}
            </p>
            <p>
              <strong>Address:</strong> {selectedCustomer.address}
            </p>
            <p>
              <strong>Joining Date:</strong>{" "}
              {new Date(selectedCustomer.joiningDate).toLocaleString()}
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

export default Customer;