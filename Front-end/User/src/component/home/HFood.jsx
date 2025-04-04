import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../common/header/title/Title";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import Rating from "../common/rating/Rating";

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

const HFood = () => {


  // ADD-TO-CART
  const { addItem } = useCart();
  const addItemHandlar = (item, id) => {
    item.id = id;
    addItem(item);
    Swal.fire({
      icon: "success",
      text: item.title + " Added.",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <>
      <section className="food padding">
        <div className="container">
          <Title subtitle="Our Food Menu" title="Our Populer Food Menu" />
        </div>
        <div className="container grid-4">
          {foods.length === 0 ? (
            <h3 className="text-center">No items found!</h3>
          ) : (
            foods.slice(0, 8).map((item, index) => (
              <div key={index} className="items shadow">
                <div className="img">
                  <Link to={"/foods/" + item._id}>
                    <img
                      src={"/img/food/p1.jpg"}
                      alt={item.title}
                      className="img-responsive img-curve"
                    />
                  </Link>
                </div>
                <div className="text text-center">
                  <h4>
                    <Link to={"/foods/" + item._id}>{item.title}</Link>
                  </h4>
                  <h5>
                    <Rating rating={item.rating} />
                    <span>({item.totalReviews})</span>
                  </h5>
                  <p>{item.description.slice(0, 50)}...</p>
                  <h5>Rs. {item.price}</h5>
                  <div className="flexSB">
                    <Link to={"/foods/" + item._id} className="btn-primary">
                      <i className="fas fa-eye"></i> View Detail
                    </Link>
                    {item.active === "on" ? (
                      <Link
                        className="btn-primary"
                        onClick={() => {
                          addItemHandlar(item, item._id);
                        }}
                      >
                        <i className="fas fa-shopping-cart"></i> Add To Cart
                      </Link>
                    ) : (
                      <Link className="btn-primary disableLink">
                        <i className="fas fa-shopping-cart"></i> Stock Out
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default HFood;
