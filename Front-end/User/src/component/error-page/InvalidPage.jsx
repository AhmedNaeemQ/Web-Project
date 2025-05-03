import React from "react";
import { Link } from "react-router-dom";
import Banner from "../common/banner/Banner";
import 'bootstrap/dist/css/bootstrap.min.css';

const InvalidPage = () => {
  return (
    <div>
      <Banner title="Bistro Noir" subtitle="Oops..." />
      <section className="py-5 text-center">
        <div className="container">
          <h1 className="display-4 text-warning">404 - Page Not Found</h1>
          <p className="lead mt-3">
            Looks like you’ve taken a wrong turn. Maybe the page you’re looking for is in the kitchen!
          </p>
          <p className="mb-4">
            Let's get you back to the main menu where all the delicious choices are waiting.
          </p>
          <Link to="/" className="btn btn-dark px-4 py-2">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default InvalidPage;
