import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  const cards = [
    { title: "Total Orders", icon: "ri-shopping-basket-line", count: "120+" },
    { title: "Revenue", icon: "ri-currency-fill", count: "Rs 50,000+" },
    { title: "Foods", icon: "ri-service-line", count: "80+" },
    { title: "Categories", icon: "ri-list-check", count: "10+" },
    { title: "Blogs", icon: "ri-pages-line", count: "15+" },
    { title: "Customers", icon: "ri-map-pin-user-fill", count: "200+" },
    { title: "Delivery Riders", icon: "ri-truck-line", count: "25+" },
    { title: "Managers", icon: "ri-team-line", count: "5+" },
    { title: "Messages", icon: "ri-chat-2-line", count: "50+" },
  ];

  return (
    <div className="w-full h-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow duration-300"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <h4 className="text-lg font-semibold text-[#050A36]">
                {card.title}
              </h4>
              <p className="text-2xl font-bold text-[#0D1552]">{card.count}</p>
            </div>
            <div className="text-[#0D1552] text-4xl">
              <i className={card.icon}></i>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;