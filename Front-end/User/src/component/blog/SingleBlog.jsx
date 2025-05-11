import React, { useEffect, useState } from "react";
import PageHeader from "../common/header/title/PageHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Banner from "../common/banner/Banner";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/blogs/${id}`);
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  return (
    <>
      <Banner title={blog.post_by} subtitle={blog.title}/>
      <section className="py-5">
  <div className="container">
    {/* Blog Info and Image */}
    <div className="d-flex flex-column align-items-center flex-md-row gap-4 mb-4">
      
      {/* Info */}
      <div className="flex-fill">
        <h2 className="fw-bold mb-3">{blog.title}</h2>
        <div className="d-flex flex-wrap gap-3 text-muted small">
          <div className="d-flex align-items-center gap-2">
            <i className="fa fa-user"></i>
            <span>{blog.post_by}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="fa fa-calendar-alt"></i>
            <span>{moment(blog.date).format("MMMM Do, YYYY")}</span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="flex-shrink-0">
        <img
          src={`/blogs/${blog.thumb}`}
          alt={blog.title}
          className="img-fluid rounded shadow"
          style={{ width: "250px", height: "180px", objectFit: "cover" }}
        />
      </div>
    </div>

    {/* Blog Content */}
    <div className="fs-6 lh-lg">
      {blog.description}
    </div>
  </div>
</section>



    </>
  );
};

export default SingleBlog;
