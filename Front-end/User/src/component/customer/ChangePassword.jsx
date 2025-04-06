import React from "react";
import "./customer.css";
import PageHeader from "../common/header/title/PageHeader";
import { useState } from "react";
import Profile from "./Profile";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

    return (
      <>
        <PageHeader title="Change Password" />
        <section className="dashboard">
          <div className="container padding">
            <Profile />
            <div className="dashboard-content">
              <form enctype="multipart/form-data">
                <label>Old Password</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old password..."
                  required
                />
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password..."
                  required
                />
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={conPassword}
                  onChange={(e) => setConPassword(e.target.value)}
                  placeholder="Confirm password..."
                  required
                />
                <button className="btn-primary">Update</button>
              </form>
            </div>
          </div>
        </section>
      </>
    );
};

export default ChangePassword;
