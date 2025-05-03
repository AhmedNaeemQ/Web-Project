import React from "react";
import PageHeader from "../common/header/title/PageHeader";
import "./blog.css";
import BlogItem from "./BlogItem";
import Banner from "../common/banner/Banner";

const Blog = () => {
  return (
    <>
      <Banner title="Our Blogs" subtitle="Explore Blogs"/>
      <section className="blog">
        <div className="container">
          <BlogItem />
        </div>
      </section>
    </>
  );
};

export default Blog;
