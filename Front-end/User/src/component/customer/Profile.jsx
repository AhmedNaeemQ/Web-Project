import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const customer = {
  name: "Ali",
  date: "2025-11-02",
  email: "ali@gmail.com",
  phone: "+92 300 1289722",
  address: "Johar Town, Lahore",
}

const Profile = () => {
  const customerLogout = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className="dashboard-content-inner grid-2">
        <div className="grid-2">
          <div className="img">
            <img src={"/img/avatar.png"} alt={""} />
          </div>
          <div className="profile-text">
            <h4>
              <i class="fa fa-user"></i> {customer.name}
            </h4>
            <p>
              <i class="fa fa-user-plus"></i>
              {" "}
              {customer.date && moment(customer.date).format("ll")}
            </p>
            <p>
              <i class="fa fa-envelope"></i> {customer.email}
            </p>
            <p>
              <i class="fa fa-phone"></i> {customer.phone}
            </p>
            <p>
              <i class="fa fa-location-dot"></i> {customer.address}
            </p>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <Link to="/customer/dashboard" className="btn-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/customer/change-details" className="btn-primary">
                Change Details
              </Link>
            </li>
            <li>
              <Link
                to="/customer/change-profile-picture"
                className="btn-primary"
              >
                Change Profile Picture
              </Link>
            </li>
            <li>
              <Link to="/customer/change-password" className="btn-primary">
                Change Password
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  customerLogout();
                }}
                className="btn-primary"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Profile;
