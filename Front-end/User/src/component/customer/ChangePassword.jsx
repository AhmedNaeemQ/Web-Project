import React from "react";
import "./customer.css";
import PageHeader from "../common/header/title/PageHeader";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";
import Profile from "./Profile";
import Banner from "../common/banner/Banner";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [email, setEmail] = useState("");
  const [currentThumb, setThumb] = useState("");

  // GET CUSTOMER DETAILS
  const id = Cookies.get("customer");
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/customers/${id}`);
      setThumb(data.thumb);
      setEmail(data.email);
    };
    fatchCustomer();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword === conPassword) {
      let updateData = {
        oldPassword,
        newPassword,
        email,
        thumb: currentThumb,
      };
      axios
        .put(`http://localhost:3000/api/customers/${id}?cthumb=${currentThumb}`, updateData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.message === "Something wrong.") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });
          } else if (response.data.message === "Old password doesn't match.") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.message,
            });
          } else {
            Swal.fire({
              icon: "success",
              text: response.data.message,
              showConfirmButton: false,
              timer: 1000,
            });

            window.location.href = "/customer/dashboard";
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Update field!",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "Confirm password doesn't match.",
      });
    }
  };

  if (!Cookies.get("customer")) {
    window.location.href = "/login";
  } else {
    return (
      <>
        <Banner title="Dashboard" subtitle="Update Password"/>
        <section className="container py-4 d-flex flex-column align-items-center">
          <div className="w-100 mb-4">
            <Profile />
          </div>

          <form
            encType="multipart/form-data"
            onSubmit={submitHandler}
            className="w-100 p-4 border rounded-4 shadow-sm bg-white d-flex flex-column gap-3"
          >
            <div className="d-flex flex-column">
              <label htmlFor="oldPassword" className="form-label fw-medium">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                required
              />
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="newPassword" className="form-label fw-medium">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="conPassword" className="form-label fw-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="conPassword"
                className="form-control"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-warning text-black fw-medium">
                Update Password
              </button>
            </div>
          </form>
        </section>
      </>
    );
  }
};

export default ChangePassword;
