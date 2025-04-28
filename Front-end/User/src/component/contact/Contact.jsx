import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import PageHeader from "../common/header/title/PageHeader";
import "./contact.css";
import Banner from "../common/banner/Banner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      name,
      email,
      subject,
      phone,
      message,
    };
    axios
      .post(`http://localhost:1000/api/admin/messages`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          text: "Message send successfull.",
          showConfirmButton: false,
          timer: 1000,
        });
        setName("");
        setEmail("");
        setSubject("");
        setPhone("");
        setMessage("");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Message send faield!",
        });
      });
  };

  return (
    <>
      <Banner title="Contact" subtitle="Contact Us"/>

      <section className="contacts">
        <div className="container flexSB">
          <div className="left row">
            <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.123456789012!2d74.3292363150263!3d31.5820450512346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919111111111111%3A0x2222222222222222!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v0000000000000!5m2!1sen!2s"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lahore Location"
      />
          </div>

          <div className="right row">
            <h1>Get in touch</h1>
            <div className="items grid-3">
              <div className="box">
                <h4>ADDRESS:</h4>
                <p>Gulberg III, Lahore, Pakistan</p>
              </div>
              <div className="box">
                <h4>EMAIL:</h4>
                <p>info@bistronoir.com</p>
              </div>
              <div className="box">
                <h4>PHONE:</h4>
                <p>+92 42 1234 5678</p>
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <div className="flexSB">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                required
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
              />
              <textarea
                cols="30"
                rows="10"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type messages...."
                required
              ></textarea>
              <input
                type="submit"
                value="SEND MESSAGE"
                className="btn-primary"
              />
            </form>
            <h3>Follow Us</h3>
            <div className="social">
              <Link to="#">
                <i className="fab fa-facebook-f icon facebook"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-instagram icon instagram"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-twitter icon twitter"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-youtube icon youtube"></i>
              </Link>
              <Link to="#">
                <i className="fab fa-linkedin-in icon linkedin"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
