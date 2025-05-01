import express from "express";
import Orders from "../models/order.model.js";
import Foods from "../models/food.model.js";
import Categories from "../models/category.model.js";
import Blogs from "../models/blog.model.js";
import Customers from "../models/customer.model.js";
import DeliveryMen from "../models/deliveryMan.model.js";
import Users from "../models/user.model.js";
import Messages from "../models/message.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const revenue = await Orders.aggregate([
      {
        $match: { status: "Delivered" }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total_price" }
        }
      }
    ]);
    
    res.send(revenue);
  } catch (error) {
    res.status(500).send({ message: "Error calculating revenue", error: error.message });
  }
});

router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalOrders = await Orders.countDocuments();
    
    const revenueData = await Orders.aggregate([
      {
        $match: { status: "Delivered" }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total_price" }
        }
      }
    ]);
    const revenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
    
    const totalFoods = await Foods.countDocuments();
    const totalCategories = await Categories.countDocuments();
    const totalBlogs = await Blogs.countDocuments();
    const totalCustomers = await Customers.countDocuments();
    const totalDeliveryRiders = await DeliveryMen.countDocuments();
    const totalManagers = await Users.countDocuments();
    const totalMessages = await Messages.countDocuments();
    
    res.status(200).json({
      totalOrders,
      revenue,
      totalFoods,
      totalCategories,
      totalBlogs,
      totalCustomers,
      totalDeliveryRiders,
      totalManagers,
      totalMessages
    });
  } catch (error) {
    res.status(500).send({ 
      message: "Error fetching dashboard statistics", 
      error: error.message 
    });
  }
});

router.get("/monthly", async (req, res) => {
  try {
    const monthlyRevenue = await Orders.aggregate([
      {
        $match: { status: "Delivered" }
      },
      {
        $group: {
          _id: { 
            month: { $month: "$order_date" },
            year: { $year: "$order_date" }
          },
          revenue: { $sum: "$total_price" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);
    
    res.send(monthlyRevenue);
  } catch (error) {
    res.status(500).send({ message: "Error calculating monthly revenue", error: error.message });
  }
});

export default router;