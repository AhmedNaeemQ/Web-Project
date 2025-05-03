import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../../config/axios";
import { useToast } from "../../assets/context/ToastContext";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    revenue: 0,
    totalFoods: 0,
    totalCategories: 0,
    totalBlogs: 0,
    totalCustomers: 0,
    totalDeliveryRiders: 0,
    totalManagers: 0,
    totalMessages: 0,
  });
  const [loading, setLoading] = useState(true);
  const { setToast } = useToast();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/revenue/dashboard-stats");
      if (!response.status === 200) {
        setToast({
          message: "Failed to fetch dashboard data",
        });
      }
      setDashboardData(response.data);
      console.log("Dashboard data loaded:", data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Orders",
      icon: "ri-shopping-basket-line",
      count: loading ? "0" : `${dashboardData.totalOrders}+`,
    },
    {
      title: "Revenue",
      icon: "ri-currency-fill",
      count: loading ? "0" : `Rs ${dashboardData.revenue}+`,
    },
    {
      title: "Foods",
      icon: "ri-service-line",
      count: loading ? "0" : `${dashboardData.totalFoods}+`,
    },
    {
      title: "Categories",
      icon: "ri-list-check",
      count: loading ? "0" : `${dashboardData.totalCategories}+`,
    },
    {
      title: "Blogs",
      icon: "ri-pages-line",
      count: loading ? "0" : `${dashboardData.totalBlogs}+`,
    },
    {
      title: "Customers",
      icon: "ri-map-pin-user-fill",
      count: loading ? "0" : `${dashboardData.totalCustomers}+`,
    },
    {
      title: "Delivery Riders",
      icon: "ri-truck-line",
      count: loading ? "0" : `${dashboardData.totalDeliveryRiders}+`,
    },
    {
      title: "Managers",
      icon: "ri-team-line",
      count: loading ? "0" : `${dashboardData.totalManagers}+`,
    },
    {
      title: "Messages",
      icon: "ri-chat-2-line",
      count: loading ? "0" : `${dashboardData.totalMessages}+`,
    },
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
