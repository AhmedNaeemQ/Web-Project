import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between">
            {/* About */}
            <div className="d-flex flex-column flex-fill mb-4 mb-md-0 me-md-4">
              <img
                src="/logo.png"
                alt="Bistro Noir"
                style={{ width: 80, height: 80, objectFit: "contain" }}
                className="mb-3"
              />
              <p className="small mb-0">
                Nestled in the heart of Lahore, Bistro Noir delivers an intimate,
                fine-dining experience inspired by classic French bistros.
              </p>
              <div className="mt-3">
                {["facebook-f", "instagram", "twitter", "linkedin-in"].map(icon => (
                  <Link 
                    key={icon} 
                    to="#" 
                    className="text-light fs-5 me-3"
                  >
                    <i className={`fab fa-${icon}`}></i>
                  </Link>
                ))}
              </div>
            </div>

            {/* Explore */}
            <div className="d-flex flex-column flex-fill mb-4 mb-md-0 me-md-4">
              <h5 className="text-warning mb-3">Explore</h5>
              {[
                { to: "/", label: "Home" },
                { to: "/categories", label: "Categories" },
                { to: "/foods", label: "Food" },
                { to: "/orders", label: "Order" },
                { to: "/blogs", label: "Blog" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="small text-light text-decoration-none mb-2 d-block"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Contact Us */}
            <div className="d-flex flex-column flex-fill">
              <h5 className="text-warning mb-3">Contact Us</h5>
              <div className="small mb-2">
                <i className="fa fa-map-marker-alt me-2"></i>
                Gulberg III, Lahore, Pakistan
              </div>
              <div className="small mb-2">
                <i className="fa fa-phone-alt me-2"></i>
                +92 42 1234 5678
              </div>
              <div className="small">
                <i className="fa fa-envelope me-2"></i>
                info@bistronoir.com
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-secondary text-center text-light py-3 small">
        &copy; {new Date().getFullYear()} Bistro Noir — All Rights Reserved
      </div>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="btn btn-warning position-fixed"
          style={{ bottom: 20, right: 20 }}
          aria-label="Scroll to top"
        >
          <i className="fa fa-chevron-up"></i>
        </button>
      )}
    </>
  );
};

export default Footer;
