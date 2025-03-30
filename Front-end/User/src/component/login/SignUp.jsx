import React, { useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./login.css";
import Swal from "sweetalert2";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const submitHandler = (e) => {
    e.preventDefault(); 
    Swal.fire({
      icon: "success",
      text: "Registration successful!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "/customer/dashboard"; 
    });
  };

  return (
    <>
      <PageHeader title="Registration" />
      <section className="login">
        <div className="container">
          <div className="login-form text-center">
            <form onSubmit={submitHandler}>
              <img src={"/img/avatar.png"} alt="" />
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name..."
                required
              />
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
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password..."
                required
              />
              <input
                type="password"
                name="con-password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                placeholder="Confirm password..."
                required
              />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone..."
                required
              />
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address..."
                required
              />
              <input
                type="submit"
                name="submit"
                value="Registration"
                class="btn-primary"
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
