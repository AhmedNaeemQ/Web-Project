import React from "react";
import BlogItem from "./BlogItem";
import Banner from "../common/banner/Banner";

const Blog = () => {
  return (
    <>
      <Banner title="Our Blogs" subtitle="Explore Blogs"/>
      <section className="container">
        <div className="container">
          <BlogItem />
        </div>
      </section>
    </>
  );
};

export default Blog;
