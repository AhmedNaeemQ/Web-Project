import React from "react";

const Card = ({ thumb, title, price, description, onClick, actions }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow min-w-[235px]"
      onClick={onClick}
    >
      <img
        src={`/foods/${thumb}`}
        alt={title}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-bold text-[#050A36]">{title}</h3>
      {description && <p className="text-sm text-gray-600 mb-2">{description?.slice(0, 40)}...</p>}
      {price && <p className="text-[#0D1552] font-semibold">Rs {price}</p>}
      {actions && <div className="flex justify-end gap-2 mt-4">{actions}</div>}
    </div>
  );
};

export default Card;