import express from "express";
import cors from "cors";
import messages from "./routers/messages.route.js";
import foodRoute from "./routers/foods.route.js";
import categoryRoute from "./routers/categories.route.js";
import blogRoute from "./routers/blogs.route.js";
import userRoute from "./routers/users.route.js";
import customerRoute from "./routers/customers.route.js";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MESSAGE API
app.use("/api/admin/messages", messages);
app.use("/api/admin/messages/:id", messages);

// ADMIN FOOD API
app.use("/api/admin/foods", foodRoute);
app.use("/api/admin/foods/:id", foodRoute);

// ADMIN CATEGORY API
app.use("/api/admin/categories", categoryRoute);
app.use("/api/admin/categories/:id", categoryRoute);

// ADMIN BLOG API
app.use("/api/admin/blogs", blogRoute);
app.use("/api/admin/blogs/:id", blogRoute);

// USER API
app.use("/api/admin/users", userRoute);
app.use("/api/admin/users/:id", userRoute);

// CUSTOMER API
app.use("/api/admin/customers", customerRoute);
app.use("/api/admin/customers/:id", customerRoute);


app.get("/", (req, res) => {
  res.send("<h1>App is running...</h1>");
});

// Router Not Found
app.use((req, res, next) => {
  res.json({
    message: "Router Not Found!",
  });
});

// Server Error
app.use((err, req, res, next) => {
  res.json({
    message: "Something broken!",
  });
});

export default app;
