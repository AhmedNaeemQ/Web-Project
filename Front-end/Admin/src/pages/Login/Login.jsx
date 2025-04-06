import { motion } from "framer-motion";
import LoginForm from "./components/LoginForm";
import TextSection from "./components/TextSection";

const Login = () => {
  const textSectionVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const formSectionVariants = {
    hidden: { opacity: 100, x: -680 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div className="w-screen h-screen bg-[#E9F0F7] flex overflow-hidden font-inter">
      <motion.div
        className="w-1/2 h-full p-[5%] justify-center items-center hidden md:flex"
        variants={textSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <TextSection
          heading="Restaurant Admin Panel"
          paragraph="Effortlessly manage your restaurant operations with our powerful admin panel. From tracking orders to managing food items, delivery riders, and users, everything is at your fingertips."
          bullets={[
            "• Monitor and manage customer orders in real-time.",
            "• Add, update, or remove food items and categories.",
            "• Assign and track delivery riders efficiently.",
            "• View and manage user profiles and activity.",
            "• Generate detailed reports to analyze performance.",
          ]}
        />
      </motion.div>

      <motion.div
        className="bg-white h-full w-full md:w-1/2 md:rounded-l-[80px]"
        variants={formSectionVariants}
        initial="hidden"
        animate="visible"
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Login;
