import React from "react";
import { motion } from "framer-motion";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Action</h2>
        <p className="text-gray-600 mb-6">{message || "Are you sure?"}</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
