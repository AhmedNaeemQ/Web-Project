import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import adminLogo from "../admin.avif";

const Sidebar = () => {
  const navLinks = [
    { path: "/dashboard", display: "Dashboard", icon: "ri-dashboard-line" },
    { path: "/orders", display: "Orders", icon: "ri-shopping-basket-line" },
    {
      display: "Management",
      icon: "ri-settings-3-line",
      childrens: [
        { path: "/foods", display: "Foods", icon: "ri-service-line" },
        { path: "/categories", display: "Categories", icon: "ri-list-check" },
        {
          path: "/delivery-riders",
          display: "Delivery Riders",
          icon: "ri-truck-line",
        },
      ],
    },
    { path: "/customers", display: "Customers", icon: "ri-user-line" },
    { path: "/messages", display: "Messages", icon: "ri-chat-2-line" },
  ];

  const SidebarItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (item.childrens) {
      return (
        <div className="space-y-2">
          <div
            className="flex items-center justify-between cursor-pointer p-2 hover:bg-[#1A237E] rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center gap-2">
              {item.icon && <i className={`${item.icon} text-lg`}></i>}
              {item.display}
            </span>
            <i
              className={`ri-arrow-down-s-fill transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            ></i>
          </div>
          {isOpen && (
            <ul className="pl-6 space-y-1">
              {item.childrens.map((child, index) => (
                <SidebarItem key={index} item={child} />
              ))}
            </ul>
          )}
        </div>
      );
    } else {
      return (
        <li>
          <NavLink
            to={item.path || "#"}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md ${
                isActive
                  ? "bg-[#1A237E] text-white"
                  : "text-gray-300 hover:bg-[#1A237E] hover:text-white"
              }`
            }
          >
            {item.icon && <i className={`${item.icon} text-lg`}></i>}
            {item.display}
          </NavLink>
        </li>
      );
    }
  };

  return (
    <motion.aside
      className="w-64 h-screen bg-[#0D1552] text-white flex flex-col fixed"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Logo Section */}
      <div className="p-6 flex items-center justify-center border-b border-gray-700">
        <a href="/" title="Go Home Page">
          <img src={adminLogo} alt="Logo" className="w-24 h-auto rounded-full" />
        </a>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="space-y-2 p-4">
          {navLinks.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <i className="ri-logout-circle-r-line text-xl"></i>
          Logout
        </NavLink>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
