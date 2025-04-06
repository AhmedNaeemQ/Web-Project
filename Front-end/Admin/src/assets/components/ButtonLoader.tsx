import React from "react";
import { FaSpinner } from "react-icons/fa";

const ButtonLoader = () => {
  return (
    <div className="button-loader">
      <FaSpinner className="animate-spin mx-auto" />
    </div>
  );
};

export default ButtonLoader;
