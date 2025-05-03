import express from "express";
import multer from "multer";
import Customers from "../models/customer.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
const saltRounds = 10;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customers/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const emailCheck = await Customers.findOne({ email: email });
    if (emailCheck) {
      res.json({ message: "User already exists." });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/customers/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const newCustomer = new Customers({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          thumb: avatar,
          phone: req.body.phone,
          address: req.body.address,
        });
        await newCustomer.save().then((data) => {
          res.json({ data, message: "User created successfully." });
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

router.get("/", async (req, res) => {
  await Customers.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Customers not found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "An error occurred fetching customers." });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Customers.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Customer not found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "An error occurred fetching the customer." });
    });
});

router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).json({ message: "Unable to update the customer." });
  }

  try {
    if (req.body.oldPassword) {
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const email = req.body.email;

      const customer = await Customers.findOne({ email: email });
      if (!customer) {
        return res.status(404).json({ message: "Customer not found." });
      }

      const passwordMatch = await bcrypt.compare(
        oldPassword,
        customer.password
      );
      if (!passwordMatch) {
        return res.status(400).json({ message: "Passwords do not match." });
      }

      const hash = await bcrypt.hash(newPassword, saltRounds);
      const updatedCustomer = await Customers.findByIdAndUpdate(
        id,
        { password: hash },
        { new: true, select: "-password" }
      );

      if (!updatedCustomer) {
        return res
          .status(404)
          .json({ message: "Unable to update the customer." });
      }

      return res.status(200).json({ message: "User updated successfully." });
    } else if (req.body.thumb && !req.file) {
      const updatedCustomer = await Customers.findByIdAndUpdate(id, req.body, {
        new: true,
        select: "-password",
      });

      if (!updatedCustomer) {
        return res
          .status(404)
          .json({ message: "Unable to update the customer." });
      }

      return res.status(200).json({
        data: updatedCustomer,
        message: "User updated successfully.",
      });
    } else if (req.file) {
      var url_parts = url.parse(req.url, true).query;
      var oldThumb = url_parts.cthumb;

      if (oldThumb) {
        try {
          const filePath = `uploads/customers/${oldThumb}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (fileError) {
          console.error("Error deleting customer image:", fileError);
        }
      }

      const updatedCustomer = await Customers.findByIdAndUpdate(
        id,
        { ...req.body, thumb: req.file.filename },
        { new: true, select: "-password" }
      );

      if (!updatedCustomer) {
        return res
          .status(404)
          .json({ message: "Unable to update the customer." });
      }

      return res.status(200).json({
        data: updatedCustomer,
        message: "User updated successfully.",
      });
    } else {
      const updatedCustomer = await Customers.findByIdAndUpdate(id, req.body, {
        new: true,
        select: "-password",
      });

      if (!updatedCustomer) {
        return res
          .status(404)
          .json({ message: "Unable to update the customer." });
      }

      return res.status(200).json({
        data: updatedCustomer,
        message: "User updated successfully.",
      });
    }
  } catch (err) {
    console.error("Error updating customer:", err);
    return res.status(500).json({
      message: "An error occurred updating the customer.",
      error: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const customer = await Customers.findById(id);
    if (!customer) {
      return res.status(404).send({ message: "Customer not found." });
    }
    
    var url_parts = url.parse(req.url, true).query;
    var thumb = url_parts.thumb || customer.thumb;
    
    if (thumb) {
      try {
        const filePath = `uploads/customers/${thumb}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error("Error deleting customer image:", fileError);
      }
    }

    await Customers.findByIdAndDelete(id);
    res.status(200).send({ message: "Customer deleted successfully." });
    
  } catch (err) {
    console.error("Error deleting customer:", err);
    res.status(500).send({ 
      message: "An error occurred deleting the customer.",
      error: err.message 
    });
  }
});

export default router;
