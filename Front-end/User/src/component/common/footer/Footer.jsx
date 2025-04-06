import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const [bactToTop, setBactToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 50) {
        setBactToTop(false);
      } else {
        setBactToTop(true);
      }
    });
  }, []);


  const bactToTopButton = () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer>
        <div className="container padding grid-4">
          <div className="box footer-logo">
            <img src={"/img/logo.png"} alt="Logo" />
            <p>
              Located in the heart of Lahore.
            </p>
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
                <i className="fab fa-linkedin-in icon linkedin"></i>
              </Link>
            </div>
          </div>
          <div className="box link">
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/foods">Food</Link>
              </li>
              <li>
                <Link to="/blogs">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a href="http://localhost:3000/">Admin</a>
              </li>
            </ul>
          </div>

          <div className="box last">
            <h3>Have a Questions?</h3>
            <ul>
              <li>
                <i className="fa fa-location-dot"></i>
                Lahore, Pakistan
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                +92 309 3929 210
              </li>
              <li>
                <i className="fa fa-paper-plane"></i>
                restaurant@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <p>
          &copy; Copyright 2025 All Right Reserved. By <span>Restaurant</span>
        </p>
        <Link
          id="back-to-top"
          className={`btn-primary smooth-scroll ${bactToTop ? "show" : "hide"}`}
          onClick={() => bactToTopButton()}
        >
          <i className="fa fa-angle-double-up"></i>
        </Link>
      </div>
    </>
  );
};

export default Footer;
