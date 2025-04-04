import React, { useState } from "react";
import { motion } from "framer-motion";

const Messages = () => {
  const [reply, setReply] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const messages = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      message: "I have a question about my recent order.",
      date: "2025-03-28T10:00:00Z",
      photo: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      message: "Great service! Keep it up.",
      date: "2025-03-28T12:00:00Z",
      photo: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "555-123-4567",
      message: "Can you help me with my account?",
      date: "2025-03-29T09:00:00Z",
      photo: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      phone: "444-987-6543",
      message: "Thank you for the quick response!",
      date: "2025-03-29T11:30:00Z",
      photo: "https://via.placeholder.com/50",
    },
  ];

  const handleReply = (id) => {
    console.log(`Reply to message ${id}: ${reply}`);
    setReply("");
  };

  return (
    <div className="w-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Messages</h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: message.id * 0.1 }}
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={message.photo}
                alt={message.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-[#050A36]">
                  {message.name}
                </h3>
                <p className="text-sm text-gray-600">{message.email}</p>
                <p className="text-sm text-gray-600">{message.phone}</p>
              </div>
            </div>

            {/* Message Content */}
            <div>
              <p className="text-gray-800">{message.message}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(message.date).toLocaleString()}
              </p>
            </div>

            {/* Reply Section */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Write a reply..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D1552]"
                value={selectedMessage === message.id ? reply : ""}
                onChange={(e) => {
                  setSelectedMessage(message.id);
                  setReply(e.target.value);
                }}
              />
              <button
                className="px-4 py-2 bg-[#0D1552] text-white rounded-lg hover:bg-[#1A237E] transition"
                onClick={() => handleReply(message.id)}
              >
                Send
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Messages;