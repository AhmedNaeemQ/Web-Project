import express from "express";
import multer from "multer";
import Orders from "../models/order.model.js";
const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/ordres/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });


router.post("/", upload.single("thumb"), async (req, res) => {
  try {
    const newOrder = new Orders({
      orderID: req.body.orderID,
      customer_id: req.body.customer_id,
      customer_name: req.body.customer_name,
      items: req.body.items,
      total_foods: req.body.total_foods,
      total_quantity: req.body.total_quantity,
      deliveryCost: req.body.deliveryCost,
      total_price: req.body.total_price,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      address: req.body.address,
      payment: req.body.payment,
    });
    await newOrder.save().then((data) => {
      res.send("Order placed successfully.");
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});


router.get("/", async (req, res) => {
  await Orders.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Orders not found" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred finding orders." });
    });
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Orders.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Order not found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred finding the order." });
    });
});


router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ Message: "Failed to update the order." });
  }
  await Orders.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Order not found." });
      } else {
        res.send("Order updated successfully.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred updating order." });
    });
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Orders.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Unable to delete the order." });
      } else {
        res.status(200).send("Order deleted successfully.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred deleting the order." });
    });
});


router.put("/:id/review", async (req, res) => {
  const id = req.params.id;
  try {
    const { food_id } = req.body;
    const order = await Orders.findById(id);
    if (order) {
      const food = order.items.find((r) => r._id.toString() === food_id);
      if (food) {
        res.send(food);
        await Orders.updateOne(
          { _id: id, "items._id": food_id },
          { $set: { "items.$.review": "Yes" } }
        );
      }
    } else {
      res.json({ message: "Order not found." });
    }
  } catch (error) {
    res.json({ message: "Something went wrong." });
  }
});

export default router;
