import React, { useEffect } from "react";
import PageHeader from "../common/header/title/PageHeader";
import FoodItem from "./FoodItem";
import "./food.css";
import { useState } from "react";
import axios from "axios";
import Banner from "../common/banner/Banner";

const Food = () => {
  const [query, setQuery] = useState("");
  // GET FOODS
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fetchFoods = async () => {
      const { data } = await axios.get(`http://localhost:1000/api/admin/foods?q=${query}`);
      setFoods(data);
    };
    fetchFoods();
  }, [query]);

  return (
    <>

      <Banner title="Our Menu" subtitle="Explore Cuisines"/>
      <section className="food">
        <div className="container text-center">
          <div className="search-food-form">
            <input
              type="search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Dishes.."
              required
            />
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
