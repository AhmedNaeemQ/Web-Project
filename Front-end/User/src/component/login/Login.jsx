import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../common/header/title/PageHeader";
import "./login.css";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault(); 
    Swal.fire({
      icon: "success",
      text: "Login successful",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "/customer/dashboard"; 
    });

  };
  return (
    <>
      <PageHeader title="Login" />
      <section className="login">
        <div className="container">
          <div className="login-form text-center">
              <div>
                <form onSubmit={submitHandler}>
                  <img src={"/img/avatar.png"} alt="" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password..."
                    required
                  />
                  <input
                    type="submit"
                    name="submit"
                    value="Login"
                    class="btn-primary"
                  />
                </form>
                <Link to="/registration">Create Account</Link>
              </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
