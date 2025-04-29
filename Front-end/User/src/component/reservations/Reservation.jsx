import React, { useState } from "react";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS import
import Banner from "../common/banner/Banner";

const Reservations = () => {
  // State to store form data
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: 1,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with actual API call logic
    Swal.fire({
      icon: "success",
      title: "Reservation Successful",
      text: "Your reservation has been made successfully!",
    });
    // Clear the form
    setReservation({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      people: 1,
    });
  };

  return (
    <>
    <Banner title="Reservation" subtitle="Book Your Reservation"/>
    <div className="container py-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            name="name"
            value={reservation.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            name="email"
            value={reservation.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
            name="phone"
            value={reservation.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Reservation Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={reservation.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="time" className="form-label">
            Reservation Time
          </label>
          <input
            type="time"
            className="form-control"
            id="time"
            name="time"
            value={reservation.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="people" className="form-label">
            Number of People
          </label>
          <input
            type="number"
            className="form-control"
            id="people"
            name="people"
            value={reservation.people}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Book Reservation
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Reservations;
