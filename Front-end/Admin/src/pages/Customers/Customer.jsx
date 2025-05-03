import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../../assets/components/Card";
import ConfirmModal from "../../assets/components/ConfirmModal";
import DetailsModal from "../../assets/components/DetailsModal";
import EditCustomerModal from "./components/EditCustomerModal";
import Loader from "../../assets/components/Loader";
import { useToast } from "../../assets/context/ToastContext";
import axiosInstance from "../../../config/axios";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const { setToast } = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setToast({ type: "error", message: "Failed to load customers" });
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const closePopup = () => {
    setSelectedCustomer(null);
  };

  const handleEdit = (e, customer) => {
    e.stopPropagation();
    setCurrentCustomer(customer);
    setEditModal(true);
  };

  const handleEditSuccess = (updatedCustomer) => {
    setCustomers(customers.map(customer => 
      customer._id === updatedCustomer._id ? updatedCustomer : customer
    ));
    setEditModal(false);
    setToast({ type: "success", message: "Customer updated successfully" });
  };

  const confirmDelete = (e, customer) => {
    e.stopPropagation();
    setCustomerToDelete(customer);
    setConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!customerToDelete) return;

    try {
      await axiosInstance.delete(`/customers/${customerToDelete._id}`);
      setCustomers(customers.filter(customer => customer._id !== customerToDelete._id));
      setConfirmModal(false);
      setCustomerToDelete(null);
      setToast({ type: "success", message: "Customer deleted successfully" });
    } catch (error) {
      console.error("Error deleting customer:", error);
      setToast({ type: "error", message: "Failed to delete customer" });
    }
  };

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Customers</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {customers.length === 0 ? (
            <div className="col-span-full text-center p-8 bg-white rounded-lg shadow">
              No customers found!
            </div>
          ) : (
            customers.map((customer) => (
              <Card
                key={customer._id}
                thumb={customer.thumb ? `/uploads/customers/${customer.thumb}` : "/placeholder-user.jpg"}
                title={customer.name}
                subtitle={customer.email}
                description={customer.phone || "No phone number"}
                onClick={() => handleCustomerClick(customer)}
                badges={[
                  { text: customer.active ? "Active" : "Inactive", color: customer.active ? "green" : "red" }
                ]}
                actions={
                  <>
                    <button
                      onClick={(e) => handleEdit(e, customer)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <i className="ri-edit-box-fill"></i>
                    </button>
                    <button
                      onClick={(e) => confirmDelete(e, customer)}
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

      {selectedCustomer && (
        <DetailsModal
          isOpen={true}
          onClose={closePopup}
          title="Customer Details"
          image={selectedCustomer.thumb ? `/uploads/customers/${selectedCustomer.thumb}` : "/placeholder-user.jpg"}
          details={{
            Name: selectedCustomer.name,
            Email: selectedCustomer.email,
            Phone: selectedCustomer.phone || "Not provided",
            Address: selectedCustomer.address || "Not provided",
            "Joining Date": new Date(selectedCustomer.createdAt).toLocaleString(),
            "Last Updated": new Date(selectedCustomer.updatedAt).toLocaleString(),
            "Orders": selectedCustomer.orders?.length || 0,
            "Status": selectedCustomer.active ? "Active" : "Inactive"
          }}
        />
      )}

      {confirmModal && (
        <ConfirmModal
          isOpen={true}
          onConfirm={handleDelete}
          onCancel={() => {
            setConfirmModal(false);
            setCustomerToDelete(null);
          }}
          message={`Do you really want to delete ${customerToDelete?.name}?`}
        />
      )}

      {editModal && (
        <EditCustomerModal
          onClose={() => setEditModal(false)}
          customer={currentCustomer}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default Customer;