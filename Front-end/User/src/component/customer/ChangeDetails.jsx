import React from "react";
import { useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import Profile from "./Profile";

const ChangeDetails = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  

  
    return (
      <>
        <PageHeader title="Change Details" />
        <section className="dashboard">
          <div className="container padding">
            <Profile />
            <div className="dashboard-content">
              <form enctype="multipart/form-data">
              <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <label>Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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

export default ChangeDetails;
