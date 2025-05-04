import express from "express";
import Users from "../models/user.model.js";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Users.findOne({ email: email }).then((admin) => {
      if (admin) {
        bcrypt.compare(password, admin.password, (err, result) => {
          if (result === true) {
             const token = jwt.sign(
              { id: admin._id, email: admin.email },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1h" }
            );
            res.json({ admin,token, message: "Login successfully." });
           
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
