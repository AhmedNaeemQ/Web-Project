import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  name: {
    type: String,
    // require: true,
  },
  email: {
    type: String,
    // require: true,
  },
  subject: {
    type: String,
    // require: true,
  },
  phone: {
    type: String,
    // require: true,
  },
  message: {
    type: String,
    // require: true,
  },
  reply: {
    type: String,
  },
  read: {
    type: String,
    default: "No",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Messages = mongoose.model("Messages", messageSchema);
export default Messages;
