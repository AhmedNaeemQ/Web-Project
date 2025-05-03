import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "../../assets/context/ToastContext";
import axiosInstance from "../../../config/axios";
import Loader from "../../assets/components/Loader";
import ConfirmModal from "../../assets/components/ConfirmModal";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyLoading, setReplyLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const { setToast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setToast({
        message: "Failed to load messages",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (id) => {
    if (!reply.trim()) {
      setToast({
        message: "Reply cannot be empty",
        type: "error",
      });
      return;
    }

    try {
      setReplyLoading(true);
      const response = await axiosInstance.put(`/messages/${id}`, {
        reply: reply,
        read: "Yes"
      });

      if (response.status === 200) {
        // Update message in local state
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, reply, read: "Yes" } : msg
        ));
        
        setToast({
          message: "Reply sent successfully!",
          type: "success",
        });
        setReply("");
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      setToast({
        message: "Failed to send reply",
        type: "error",
      });
    } finally {
      setReplyLoading(false);
    }
  };

  const confirmDelete = (message) => {
    setMessageToDelete(message);
    setConfirmModal(true);
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;

    try {
      const response = await axiosInstance.delete(`/messages/${messageToDelete._id}`);
      
      if (response.status === 200) {
        // Remove message from local state
        setMessages(messages.filter(msg => msg._id !== messageToDelete._id));
        
        setToast({
          message: "Message deleted successfully!",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      setToast({
        message: "Failed to delete message",
        type: "error",
      });
    } finally {
      setConfirmModal(false);
      setMessageToDelete(null);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="w-full bg-[#E9F0F7] p-8 font-inter">
      <h1 className="text-3xl font-bold text-[#050A36] mb-8">Messages</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <p className="text-lg text-gray-600">No messages found</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {messages.map((message, index) => (
            <motion.div
              key={message._id}
              className={`bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 ${
                message.read === "No" ? "border-l-4 border-[#0D1552]" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* User Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={message.thumb ? `${import.meta.env.VITE_API_URL}/customers/${message.thumb}` : "/placeholder-user.png"}
                    alt={message.name || "User"}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-user.png";
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#050A36]">
                      {message.name || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-600">{message.email || "No email"}</p>
                    <p className="text-sm text-gray-600">{message.phone || "No phone"}</p>
                  </div>
                </div>
                <button
                  onClick={() => confirmDelete(message)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete message"
                >
                  <i className="ri-delete-bin-6-line text-xl"></i>
                </button>
              </div>

              {/* Message Content */}
              <div className="border-t border-b py-4">
                <p className="text-gray-800">{message.message}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {formatDate(message.date || message.createdAt)}
                </p>
              </div>

              {/* Reply Section */}
              {message.reply && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium text-sm text-gray-600">Your reply:</p>
                  <p className="text-gray-800">{message.reply}</p>
                </div>
              )}

              {!message.reply && (
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D1552]"
                    value={selectedMessage === message._id ? reply : ""}
                    onChange={(e) => {
                      setSelectedMessage(message._id);
                      setReply(e.target.value);
                    }}
                  />
                  <button
                    className="px-4 py-2 bg-[#0D1552] text-white rounded-lg hover:bg-[#1A237E] transition"
                    onClick={() => handleReply(message._id)}
                    disabled={replyLoading || selectedMessage !== message._id || !reply.trim()}
                  >
                    {replyLoading && selectedMessage === message._id ? (
                      <span className="inline-block w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {confirmModal && (
        <ConfirmModal
          isOpen={confirmModal}
          onCancel={() => {
            console.log("Modal closed");
            setConfirmModal(false);
            setMessageToDelete(null);
          }}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this message?"
        />
      )}
    </div>
  );
};

export default Messages;