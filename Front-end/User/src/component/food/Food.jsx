import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import FoodItem from "./FoodItem";
import "./food.css";
import { useState } from "react";

const foods = [
  {
    "_id": "1",
    "title": "Cheeseburger",
    "thumb": "cheeseburger.jpg",
    "rating": 4.5,
    "totalReviews": 120,
    "description": "Juicy beef patty with melted cheese, fresh lettuce, and tomatoes.",
    "price": 5.99,
    "active": "on"
  },
  {
    "_id": "2",
    "title": "Margherita Pizza",
    "thumb": "margherita.jpg",
    "rating": 4.7,
    "totalReviews": 200,
    "description": "Classic pizza with fresh tomatoes, basil, and mozzarella cheese.",
    "price": 8.99,
    "active": "on"
  },
  {
    "_id": "3",
    "title": "Chicken Wings",
    "thumb": "chicken-wings.jpg",
    "rating": 4.3,
    "totalReviews": 150,
    "description": "Spicy and crispy wings served with a side of ranch dressing.",
    "price": 6.49,
    "active": "on"
  },
  {
    "_id": "4",
    "title": "Caesar Salad",
    "thumb": "caesar-salad.jpg",
    "rating": 4.6,
    "totalReviews": 80,
    "description": "Fresh romaine lettuce, parmesan cheese, and croutons with Caesar dressing.",
    "price": 7.99,
    "active": "off"
  },
  
];

const Food = () => {
  const [query, setQuery] = useState("");
  const filteredFoods = foods.filter((food) =>
    food.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <PageHeader title="Our Food Menu" />
      <section className="food">
        <div className="container text-center">
          <div className="search-food-form">
            <input
              type="search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Food.."
              required
            />
          </div>
        </div>
        <div className="container">
        <FoodItem foods={filteredFoods} />
        </div>
      </section>
    </>
  );
};

export default Food;
