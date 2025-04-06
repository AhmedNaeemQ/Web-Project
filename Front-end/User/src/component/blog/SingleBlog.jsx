import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import moment from "moment";

const blog = {
  "title": "The Perfect Spaghetti Carbonara Recipe",
  "post_by": "Chef Antonio Rossi",
  "date": "2025-03-30T15:30:00Z",
  "thumb": "spaghetti-carbonara.jpg",
  "description": "Spaghetti Carbonara is a classic Italian pasta dish that combines eggs, cheese, pancetta, and pepper for a rich and creamy flavor.To make the perfect carbonara, use fresh ingredients and avoid adding cream—authentic carbonara gets its creamy texture from eggs and cheese. Follow our step-by-step guide and impress your guests with this delicious homemade recipe! Cook spaghetti until al dente. Sauté pancetta until crispy. Mix eggs and cheese, then combine everything off the heat. Season with black pepper and enjoy!"
}

const SingleBlog = () => {

  return (
    <>
      <PageHeader title={blog.title} />
      <section className="singleBlog padding">
        <div className="container">
          <div className="blog-content">
            <div className="blog-title">
              <h3>{blog.title}</h3>
              <div className="admin flex">
                <span>
                  <i className="fa fa-user"></i>{" "}
                  <label htmlFor="">{blog.post_by}</label>
                </span>
                <span>
                  <i className="fa fa-calendar-alt"></i>{" "}
                  <label htmlFor="">{moment(blog.date).format("lll")}</label>
                </span>
              </div>
            </div>
            <div className="blog-text" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <img src={"/img/blog/b1.jpg"} alt="" style={{ width: "100%", maxWidth: "600px", height: "300px" }} />
              <p style={{ textAlign: "justify", marginTop: "10px" }}>{blog.description}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlog;
