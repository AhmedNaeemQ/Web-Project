import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./customer.css";
import { useState } from "react";
import Profile from "./Profile";

const ProfilePicChange = () => {
  const [file, setFile] = useState();
  function handleThumbChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }


    return (
      <>
        <PageHeader title="Change Profile Picture" />
        <section className="dashboard">
          <div className="container padding">
            <Profile />
            <div className="dashboard-content change-profile-pic-form">
              <form enctype="multipart/form-data">
                {file ? (
                  <img src={file} alt="" />
                ) : (
                  <img src={"/img/avatar.png"} alt="" />
                )}
                <input
                  type="file"
                  onChange={handleThumbChange}
                  id="thumb"
                  class="form-control"
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

export default ProfilePicChange;
