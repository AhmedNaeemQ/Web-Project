import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import axios from "axios";
import Swal from "sweetalert2";
import Profile from "./Profile";
import Banner from "../common/banner/Banner";

const ChangeDetails = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentThumb, setThumb] = useState("");


  const id = Cookies.get("customer");
  useEffect(() => {
    const fetchCustomer = async () => {
      const { data } = await axios.get(`http://localhost:1000/api/admin/customers/${id}`);
      setName(data.name);
      setPhone(data.phone);
      setAddress(data.address);
      setThumb(data.thumb);
    };
    fetchCustomer();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      name,
      phone,
      address,
      thumb: currentThumb,
    };
    axios
      .put(`/api/admin/customers/${id}?cthumb=${currentThumb}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1000,
        });
        window.location.href = "/customer/dashboard";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Update field!",
        });
      });
  };

  if (!Cookies.get("customer")) {
    window.location.href = "/login";
  } else {
    return (
      <>
        <Banner title="Dashboard" subtitle="Update Information"/>
        <section className="container py-4 d-flex flex-column align-items-center">
  <div className="w-100 mb-4" >
    <Profile />
  </div>

  <form
    encType="multipart/form-data"
    onSubmit={submitHandler}
    className="w-100 p-4 border rounded-4 shadow-sm bg-white d-flex flex-column gap-3"
   
  >
    <div className="d-flex flex-column">
      <label htmlFor="name" className="form-label fw-medium">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="form-control"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>

    <div className="d-flex flex-column">
      <label htmlFor="phone" className="form-label fw-medium">
        Phone
      </label>
      <input
        type="tel"
        id="phone"
        className="form-control"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
    </div>

    <div className="d-flex flex-column">
      <label htmlFor="address" className="form-label fw-medium">
        Address
      </label>
      <input
        type="text"
        id="address"
        className="form-control"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
    </div>

    <div className="d-flex justify-content-end">
      <button type="submit" className="btn btn-warning text-black fw-medium">
        Update
      </button>
    </div>
  </form>
</section>


      </>
    );
  }
};

export default ChangeDetails;
