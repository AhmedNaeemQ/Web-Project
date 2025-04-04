import React from "react";
import { Link } from "react-router-dom";
import Title from "../common/header/title/Title";
import moment from "moment";

const blogs = [
  {
    "_id": "1",
    "title": "10 Must-Try Street Foods Around the World",
    "description": "From spicy tacos in Mexico to crispy tempura in Japan, explore the most delicious street foods globally.",
    "thumb": "street-foods.jpg",
    "post_by": "Ali Khan",
    "date": "2024-03-25T10:30:00Z"
  },
  {
    "_id": "2",
    "title": "The Secret to Making Perfect Pasta at Home",
    "description": "Discover the key ingredients and techniques to prepare restaurant-style pasta in your own kitchen.",
    "thumb": "perfect-pasta.jpg",
    "post_by": "Sana Umar",
    "date": "2024-03-20T15:45:00Z"
  },
  {
    "_id": "3",
    "title": "Top 5 Healthy Smoothies for a Refreshing Start",
    "description": "Boost your mornings with these delicious and nutritious smoothie recipes which are healthy.",
    "thumb": "healthy-smoothies.jpg",
    "post_by": "Ayesha Durrani",
    "date": "2024-03-18T08:00:00Z"
  },
  {
    "_id": "4",
    "title": "A Guide to the Best Spices for Flavorful Cooking",
    "description": "Learn how to use essential spices to enhance your dishes with rich and vibrant flavors.",
    "thumb": "spices-guide.jpg",
    "post_by": "Mehran Ali",
    "date": "2024-03-15T12:20:00Z"
  },
  {
    "_id": "5",
    "title": "How to Bake the Perfect Chocolate Cake",
    "description": "Follow this step-by-step guide to make a moist and rich chocolate cake that melts in your mouth.",
    "thumb": "chocolate-cake.jpg",
    "post_by": "Ameer Hamza",
    "date": "2024-03-10T22:10:00Z"
  }
]


const HBlog = () => {
  return (
    <>
      <section className="blog padding">
        <div className="container">
          <Title subtitle="Our Blog" title="Recent Posts From Blog" />
        </div>
        <div className="container grid-3">
          {blogs.length === 0 ? (
            <h3 className="text-center">No items found!</h3>
          ) : (
            blogs.slice(0, 3).map((item, index) => (
              <div key={index} className="items shadow">
                <div className="img">
                  <img src={"/img/blog/b1.jpg"} alt={item.title} />
                </div>
                <div className="text">
                  <div className="admin flexSB">
                    <span>
                      <i className="fa fa-user"></i>
                      <label htmlFor="">{item.post_by}</label>
                    </span>
                    <span>
                      <i className="fa fa-calendar-alt"></i>
                      <label htmlFor="">
                        {moment(item.date).format("yyyy")}
                      </label>
                    </span>
                  </div>
                  <Link to={"/blogs/" + item._id} className="blog-title">
                    <h1>{item.title.slice(0, 60)}...</h1>
                  </Link>
                  <p>
                    {item.description.slice(0, 100)}...{" "}
                    <Link to={"/blogs/" + item._id} class="success-btn">
                      <i className="fas fa-eye"></i> Read More
                    </Link>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default HBlog;
