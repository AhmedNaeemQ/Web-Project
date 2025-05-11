import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";


const BlogItem = () => {
  // GET BLOGS
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await axios.get(`http://localhost:3000/api/blogs`);
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const cardVariants = {
    hidden: i => ({
      opacity: 0,
      y: 20,
      transition: { delay: i * 0.1, type: "spring", stiffness: 100 }
    }),
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, boxShadow: "0 6px 18px rgba(0,0,0,0.15)" }
  };

  return (
    <>
      <div className="grid-3">
        {currentItems.length === 0 ? (
          <h3 className="text-center">No items found!</h3>
        ) : (
          currentItems.map((post) => (
            <motion.div
                  className="card h-100 border-0 shadow-sm overflow-hidden"
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  variants={cardVariants}
                >
                  <Link to={`/blogs/${post._id}`} className="text-decoration-none">
                    <div className="ratio ratio-4x3">
                      <img
                        src={`/blogs/${post.thumb}`}
                        alt={post.title}
                        className="card-img-top img-fluid"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span>
                        <i className="fa fa-user me-1" />
                        {post.post_by}
                      </span>
                      <span>
                        <i className="fa fa-calendar-alt me-1" />
                        {moment(post.date).format("MMM D, YYYY")}
                      </span>
                    </div>
                    <Link to={`/blogs/${post._id}`} className="text-dark">
                      <h5 className="card-title">
                        {post.title.length > 60
                          ? post.title.slice(0, 60) + "…"
                          : post.title}
                      </h5>
                    </Link>
                    <p className="card-text flex-grow-1 text-secondary">
                      {post.description.length > 100
                        ? post.description.slice(0, 100) + "…"
                        : post.description}
                    </p>
                    <Link
                      to={`/blogs/${post._id}`}
                      className="btn btn-sm btn-primary mt-3 align-self-start"
                    >
                      <i className="fas fa-eye me-1" />
                      Read More
                    </Link>
                  </div>
                </motion.div>
          ))
        )}
      </div>
      {blogs.length >= 13 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
        />
      )}
    </>
  );
};

export default BlogItem;
