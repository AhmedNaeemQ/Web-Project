import React, { useState } from "react";

const Card = ({ thumb, title, price, description, onClick, actions, badges, subtitle }) => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow min-w-[235px] relative"
      onClick={onClick}
    >
      <img
        src={!imgError ? thumb : "/placeholder-user.png"}
        alt={title}
        className="w-full h-40 object-cover rounded mb-4"
        onError={() => setImgError(true)}
      />
      
      {badges && badges.length > 0 && (
        <div className="absolute bottom-2 left-2 flex gap-1">
          {badges.map((badge, index) => (
            <span 
              key={index}
              className={`text-xs px-2 py-1 rounded font-medium ${
                badge.color === 'green' 
                  ? 'bg-green-100 text-green-700' 
                  : badge.color === 'red'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {badge.text}
            </span>
          ))}
        </div>
      )}
      
      <h3 className="text-lg font-bold text-[#050A36]">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      {description && <p className="text-sm text-gray-600 mb-2">{description?.slice(0, 40)}...</p>}
      {price && <p className="text-[#0D1552] font-semibold">Rs {price}</p>}
      {actions && <div className="flex justify-end gap-2 mt-4">{actions}</div>}
    </div>
  );
};

export default Card;