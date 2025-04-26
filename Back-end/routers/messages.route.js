import express from "express";
import Messages from "../models/message.model.js";
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const newMessage = new Messages({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      phone: req.body.phone,
      message: req.body.message,
      read: req.body.read,
    });
    await newMessage.save().then((data) => {
      res.send("Feedback added successfully.");
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});


router.get("/", async (req, res) => {
  await Messages.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Feedbacks not found" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred fetching feedbacks." });
    });
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Messages.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Feedback not found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred fetching the feedback." });
    });
});


router.put("/:id", async (req, res) => {
  const id = req.params.id;

  await Messages.findByIdAndUpdate(
    id,
    { read: "Yes" },
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Feedback not found" });
      } else {
        res.send("Feedback status updated successfully.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred updatating the feedback status." });
    });
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Messages.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Failed to delete the feedback." });
      } else {
        res.status(200).send("Feedback deleted successfully.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred deleting the feedback." });
    });
});

export default router;
