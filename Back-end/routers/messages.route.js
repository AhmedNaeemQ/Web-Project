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

  try {
    const message = await Messages.findById(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    const updateData = { read: "Yes" };
    
    if (req.body.reply !== undefined) {
      updateData.reply = req.body.reply;
    }

    const updatedMessage = await Messages.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, 
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      message: "Message updated successfully",
      data: updatedMessage
    });
  } catch (err) {
    console.error("Error updating message:", err);
    res.status(500).json({ 
      message: "An error occurred updating the message", 
      error: err.message 
    });
  }
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
