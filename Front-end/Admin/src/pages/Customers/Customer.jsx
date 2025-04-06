import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";
import ConfirmModal from "../../assets/components/ConfirmModal";
import DetailsModal from "../../assets/components/DetailsModal";

const Customer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

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
                <button
                  // to={`/customers/${index}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="ri-eye-fill"></i>
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

      {selectedCustomer && (
      <DetailsModal
        isOpen={!!selectedCustomer}
        onClose={closePopup}
        title="Customer Details"
        image={`/customers/${selectedCustomer.thumb}`}
        details={{
          Name: selectedCustomer.name,
          Email: selectedCustomer.email,
          Phone: selectedCustomer.phone,
          Address: selectedCustomer.address,
          "Joining Date": new Date(selectedCustomer.joiningDate).toLocaleString(),
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

export default Customer;
