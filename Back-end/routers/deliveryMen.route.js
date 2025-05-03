import express from "express";
import multer from "multer";
import DeliveryMen from "../models/deliveryMan.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
const saltRounds = 10;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/delivery-men/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("thumb"), async (req, res) => {
  try {
    // Check required fields
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.phone
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Check if email already exists
    const emailCheck = await DeliveryMen.findOne({ email: req.body.email });
    if (emailCheck) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Handle image upload or use default avatar
    let avatar;
    if (req.file) {
      avatar = req.file.filename;
    } else {
      // Copy default avatar
      const filePath = "uploads/default/avatar.png";
      avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/delivery-men/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) console.error("Error copying default avatar:", error);
      });
    }

    // Hash the provided password (not hardcoded "admin")
    const hash = await bcrypt.hash(req.body.password, saltRounds);

    const newDeliveryMen = new DeliveryMen({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      thumb: avatar,
      phone: req.body.phone,
      address: req.body.address || "",
    });

    const savedDeliveryMan = await newDeliveryMen.save();

    // Create a response object without the password
    const responseData = {
      _id: savedDeliveryMan._id,
      name: savedDeliveryMan.name,
      email: savedDeliveryMan.email,
      phone: savedDeliveryMan.phone,
      address: savedDeliveryMan.address,
      thumb: savedDeliveryMan.thumb,
      rating: savedDeliveryMan.rating,
      totalReviews: savedDeliveryMan.totalReviews,
      completeOrders: savedDeliveryMan.completeOrders,
      pendingOrders: savedDeliveryMan.pendingOrders,
      date: savedDeliveryMan.date,
    };

    // Return success with the created data
    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating delivery rider:", error);
    res.status(500).json({
      message: "An error occurred creating delivery rider",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await DeliveryMen.find().sort({ _id: -1 }).select("-password"); // Exclude password but include all other fields

    if (!data || data.length === 0) {
      return res.status(404).send({ message: "No delivery boy found." });
    }

    res.status(200).send(data);
  } catch (err) {
    console.error("Error fetching delivery riders:", err);
    res.status(500).send({
      message: "An error occurred fetching delivery boys.",
      error: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await DeliveryMen.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Delivery boy not found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "An error occurred fetching delivery boy." });
    });
});

router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.status(400).send({ message: "Unable to update delivery boy." });
  }

  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, saltRounds);
      
      const updatedRider = await DeliveryMen.findByIdAndUpdate(
        id,
        { 
          ...req.body,
          password: hash 
        },
        {
          useFindAndModify: false,
          new: true,
          select: "-password" 
        }
      );
      
      if (!updatedRider) {
        return res.status(404).send({ message: "Delivery boy not found." });
      }
      
      return res.status(200).send({ 
        message: "Delivery boy updated successfully.",
        data: updatedRider
      });
    }
    else if (req.file) {
      const rider = await DeliveryMen.findById(id);
      if (!rider) {
        return res.status(404).send({ message: "Delivery boy not found." });
      }
      
      var url_parts = url.parse(req.url, true).query;
      var oldThumb = url_parts.cthumb || rider.thumb;
      
      if (oldThumb) {
        try {
          const filePath = `uploads/delivery-men/${oldThumb}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (fileError) {
          console.log("Error deleting old image:", fileError);
        }
      }
      
      const updatedRider = await DeliveryMen.findByIdAndUpdate(
        id,
        { ...req.body, thumb: req.file.filename },
        {
          useFindAndModify: false,
          new: true,
          select: "-password" // Don't return password in response
        }
      );
      
      if (!updatedRider) {
        return res.status(404).send({ message: "Delivery boy not found." });
      }
      
      return res.status(200).send({ 
        message: "Delivery boy updated successfully.",
        data: updatedRider
      });
    }
    else {
      const updatedRider = await DeliveryMen.findByIdAndUpdate(
        id,
        req.body,
        {
          useFindAndModify: false,
          new: true,
          select: "-password" // Don't return password in response
        }
      );
      
      if (!updatedRider) {
        return res.status(404).send({ message: "Delivery boy not found." });
      }
      
      return res.status(200).send({ 
        message: "Delivery boy updated successfully.",
        data: updatedRider
      });
    }
  } catch (err) {
    console.error("Error updating delivery boy:", err);
    return res.status(500).send({ 
      message: "An error occurred updating delivery boy.",
      error: err.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const rider = await DeliveryMen.findById(id);
    if (!rider) {
      return res.status(404).send({ message: "Delivery rider not found." });
    }

    var url_parts = url.parse(req.url, true).query;
    var thumb = url_parts.thumb || rider.thumb;
    
    if (thumb) {
      try {
        const filePath = `uploads/delivery-men/${thumb}`;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error("Error deleting rider image:", fileError);
      }
    }

    await DeliveryMen.findByIdAndDelete(id);
    
    res.status(200).send({ message: "Delivery rider deleted successfully." });
  } catch (err) {
    console.error("Error deleting delivery rider:", err);
    res.status(500).send({ 
      message: "An error occurred deleting delivery rider.", 
      error: err.message 
    });
  }
});

router.post("/:id/review", async (req, res) => {
  try {
    const { name, rating, comment, customer_id, deliveryManID } = req.body;
    const deliveryMan = await DeliveryMen.findById(deliveryManID);
    if (deliveryMan) {
      const review = {
        name,
        rating: Number(rating),
        comment,
        customer: customer_id,
      };
      deliveryMan.reviews.push(review);
      deliveryMan.totalReviews = deliveryMan.reviews.length;
      deliveryMan.rating =
        deliveryMan.reviews.reduce((acc, item) => item.rating + acc, 0) /
        deliveryMan.reviews.length;
      await deliveryMan.save().then((data) => {
        res.json({ message: "Delivery reviewed successfully." });
      });
    } else {
      res.json({ message: "Delivery not found." });
    }
  } catch (error) {
    res.json({ message: "Something went wrong." });
  }
});

export default router;
