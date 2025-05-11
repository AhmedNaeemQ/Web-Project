import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const id = Cookies.get("customer");
  const [customer, setCustomer] = useState({});
  useEffect(() => {
    const fetchCustomer = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/customers/${id}`);
      setCustomer(data);
    };
    fetchCustomer();
  }, []);


  const customerLogout = () => {
    Cookies.remove("customer");
    Cookies.remove("customerName");
    window.location.href = "/";
  };

  return (
    <>
    <div className="bg-white rounded-4 shadow-sm p-4">

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4 pb-4 border-bottom">
        
        <div
          className="order-0 order-md-1 mx-auto mx-md-0 rounded-circle overflow-hidden border"
          style={{ width: '120px', height: '120px' }}
        >
          <img
            src={`http://localhost:3000/uploads/customers/${customer.thumb}`}
            alt={customer.name}
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="flex-grow-1 order-1 order-md-0">
          <h5 className="fw-semibold text-dark mb-3">
            {customer.name}
          </h5>

          <div className="d-flex flex-column flex-sm-row flex-wrap gap-3 small text-muted">
            <div className="flex-fill">
              <div className="fw-medium">Phone</div>
              <div>{customer.phone}</div>
            </div>
            <div className="flex-fill">
              <div className="fw-medium">Email</div>
              <div>{customer.email}</div>
            </div>
            <div className="flex-fill">
              <div className="fw-medium">Address</div>
              <div>{customer.address}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <div className="d-flex flex-wrap justify-content-between gap-3">
          <Link to="/customer/dashboard" className="btn btn-warning text-black fw-medium flex-fill text-center">
            Dashboard
          </Link>
          <Link to="/customer/change-details" className="btn btn-warning text-black fw-medium flex-fill text-center">
            Edit Details
          </Link>
          <Link to="/customer/change-profile-picture" className="btn btn-warning text-black fw-medium flex-fill text-center">
            Profile Picture
          </Link>
          <Link to="/customer/change-password" className="btn btn-warning text-black fw-medium flex-fill text-center">
            Change Password
          </Link>
          <button
            onClick={customerLogout}
            className="btn btn-warning text-black fw-medium flex-fill text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
export default Profile;
