import express from "express";
import Users from "../models/user.model.js";
const router = express.Router();
import bcrypt from "bcrypt";


router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Users.findOne({ email: email }).then((admin) => {
      if (admin) {
        bcrypt.compare(password, admin.password, (err, result) => {
          if (result === true) {
            res.json({ admin, message: "Login successfully." });
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
