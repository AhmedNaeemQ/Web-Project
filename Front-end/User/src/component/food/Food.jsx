import React, { useEffect } from "react";
import FoodItem from "./FoodItem";
import { useState } from "react";
import axios from "axios";
import Banner from "../common/banner/Banner";

const Food = () => {
  const [query, setQuery] = useState("");
  // GET FOODS
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fetchFoods = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/foods?q=${query}`);
      setFoods(data);
    };
    fetchFoods();
  }, [query]);

  return (
    <>

      <Banner title="Our Menu" subtitle="Explore Cuisines"/>
      <section className="container">
        <div className="container text-center">
          <div className="input-group">
              <input
                type="search"
                name="search"
                className="form-control"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for Cuisines..."
                required
              />
              <span className="input-group-text px-4 py-3 bg-dark">
                <i className="text-warning fas fa-search"></i>
              </span>
            </div>

        </div>
        <div className="container">
          <FoodItem foods={foods} />
        </div>
      </section>
    </>
  );
};

export default Food;
