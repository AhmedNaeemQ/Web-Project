import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../../assets/context/ToastContext";
import ButtonLoader from "../../../assets/components/ButtonLoader";
import axiosInstance from "../../../../config/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToast } = useToast();
  const navigate = useNavigate();
  const [isLogging, setIsLogging] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLogging(true);
      const response = await axiosInstance.post("/adminLogin", {
        email,
        password,
      });
      if (response.data.message === "Login successfully.") {
        setToast({
          message: "Login successful",
          type: "success",
        });
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("id", response.data.admin._id);
        localStorage.setItem("username", response.data.admin.username);

        navigate("/dashboard");
      } else {
        setToast({
          message: response.data.message,
          type: "error",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      setToast({
        message: "Login failed. Please try again.",
        type: "error",
      });
      return;
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center">
      <h1 className="text-3xl font-semibold text-[#050A36]">Login</h1>
      <p className="">Enter your credentials to manage your restaurant</p>
      <div className="flex flex-col mt-4 w-[70%]">
        <div className="my-4 flex flex-col gap-1">
          <label className="font-semibold">Username</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="border p-2 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-4 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="font-semibold">Password</label>
            <label className="text-[#464853c2] text-xs hover:underline cursor-pointer">
              Forgot your Password?
            </label>
          </div>
          <input
            type="password"
            placeholder="**************"
            className="border p-2 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className="my-4 w-full bg-[#0D1552] rounded-xl p-3 text-white text-center"
          disabled={isLogging}
        >
          {isLogging ? <ButtonLoader /> : "Login"}
        </button>
        {/* <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#3F51B5] cursor-pointer">
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default LoginForm;
