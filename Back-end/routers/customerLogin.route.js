import express from "express";
import Customers from "../models/customer.model.js";
const router = express.Router();
import bcrypt from "bcrypt";


router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Customers.findOne({ email: email }).then((customer) => {
      if (customer) {
        bcrypt.compare(password, customer.password, (err, result) => {
          if (result === true) {
            res.json({ customer, message: "Login successfully." });
          } else {
            res.json({ message: "Incorrect email or password." });
          }
        });
      } else {
        res.json({ message: "User does not exist." });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});
export default router;
