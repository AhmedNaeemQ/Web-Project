import React from "react";
import Title from "../common/header/title/Title";
import { Link } from "react-router-dom";


const categories = [
  {
    "id": 1,
    "title": "Fast Food",
    "thumb": "fast-food.jpg",
  },
  {
    "id": 2,
    "title": "Healthy",
    "thumb": "healthy.jpg",
  },
  {
    "id": 3,
    "title": "Desserts",
    "thumb": "desserts.jpg",
  },
  {
    "id": 4,
    "title": "Beverages",
    "thumb": "beverages.jpg",
  },
  {
    "id": 5,
    "title": "Seafood",
    "thumb": "seafood.jpg",
  },
  {
    "id": 6,
    "title": "Vegan",
    "thumb": "vegan.jpg",
  }
]

const HCategories = () => {
  return (
    <>
      <section className="categories padding">
        <div className="container">
          <Title subtitle="Our Categories" title="Explore Foods Categories" />
        </div>
        <div className="container grid-4">
          {categories.length === 0 ? (
            <h3 className="text-center">No items found!</h3>
          ) : (
            categories.slice(0, 4).map((item, index) => (
              <div key={index} className="items shadow">
                <Link to={"/category-food/" + item.title}>
                  <div class="box-3 float-container">
                    <div className="category-thumb text-center">
                      <img
                        src={"/img/category/burger.jpg"}
                        alt={item.title}
                        class="img-responsive img-curve"
                      />
                    </div>
                    <div className="category-title text-center">
                      <h4 class="float-text text-white">{item.title}</h4>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default HCategories;
