import Title from "../common/header/title/Title";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const HCategories = () => {
  // GET CATEGORIES
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:1000/api/admin/categories'); 
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); 

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
                <Link to={`/category-food/${item.title}`}>
                  <div className="box-3 float-container">
                    <div className="category-thumb text-center">
                      <img
                        src={`/categories/${item.thumb}`}
                        alt={item.title}
                        className="img-responsive img-curve"
                      />
                    </div>
                    <div className="category-title text-center">
                      <h4 className="float-text text-white">{item.title}</h4>
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
