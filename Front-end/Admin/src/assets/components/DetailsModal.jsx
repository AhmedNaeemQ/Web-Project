import React from "react";

const DetailsModal = ({ isOpen, onClose, title, details, image }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold text-[#050A36] mb-4">{title}</h2>
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover rounded mb-4"
          />
        )}
        <div className="">
          {Object.entries(details).map(([key, value], index) => (
            <p key={index}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-[#0D1552] text-white rounded hover:bg-[#1A237E]"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DetailsModal;