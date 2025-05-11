import Cookies from "js-cookie";
import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import Profile from "./Profile";
import Banner from "../common/banner/Banner";

const ProfilePicChange = () => {
  const [currentThumb, setThumb] = useState("");

  // GET CUSTOMER DETAILS
  const id = Cookies.get("customer");
  useEffect(() => {
    const fatchCustomer = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/customers/${id}`);
      setThumb(data.thumb);
    };
    fatchCustomer();
  }, [id]);

  const submitHandler = (e) => {
    e.preventDefault();
    let updateData = {
      thumb: document.querySelector("#thumb").files[0],
    };
    axios
      .put(`http://localhost:3000/api/customers/${id}?cthumb=${currentThumb}`, updateData, {
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

  // SHOWING UPLOADED IMAGE
  const [file, setFile] = useState();
  function handleThumbChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  if (!Cookies.get("customer")) {
    window.location.href = "/login";
  } else {
    return (
      <>
        <Banner title="Dashboard" subtitle="Update Profile Picture"/>
        <section className="container py-4 d-flex flex-column align-items-center">
          <div className="w-100 mb-4">
            <Profile />
          </div>

          <form
            encType="multipart/form-data"
            onSubmit={submitHandler}
            className="w-100 p-4 border rounded-4 shadow-sm bg-white d-flex flex-column gap-4"
          >
            <div className="text-center">
              <img
                src={file || `/customers/${currentThumb}`}
                alt="Selected"
                className="rounded-circle shadow-sm border"
                style={{ width: "140px", height: "140px", objectFit: "cover" }}
              />
            </div>

            <div>
              <label htmlFor="thumb" className="form-label fw-medium">
                Choose New Profile Picture
              </label>
              <input
                type="file"
                id="thumb"
                onChange={handleThumbChange}
                className="form-control"
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

export default ProfilePicChange;
