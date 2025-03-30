import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";

const blogs = [
  {
    "_id": "1",
    "title": "The Art of Biryani: Secrets from Lahore’s Streets",
    "thumb": "biryani.jpg",
    "post_by": "Foodie Pakistan",
    "date": "2025-03-25T12:00:00Z",
    "description": "Explore the rich flavors of biryani from Karachi to Lahore, with secret tips to make the perfect plate at home."
  },
  {
    "_id": "2",
    "title": "Top 10 Street Foods You Must Try in Pakistan",
    "thumb": "street-food.jpg",
    "post_by": "Pakistani Bites",
    "date": "2025-03-20T14:30:00Z",
    "description": "From Gol Gappay to Bun Kabab, here are the must-try street foods of Pakistan that you shouldn't miss!"
  },
  {
    "_id": "3",
    "title": "Desi Breakfast Delights: Halwa Puri & More",
    "thumb": "halwa-puri.jpg",
    "post_by": "Lahori Food Vibes",
    "date": "2025-03-18T10:15:00Z",
    "description": "A guide to Pakistan's favorite breakfast dishes, featuring Halwa Puri, Nihari, and Chana Chaat."
  },
  {
    "_id": "4",
    "title": "The Rise of Pakistani Fine Dining",
    "thumb": "fine-dining.jpg",
    "post_by": "Gourmet Pakistan",
    "date": "2025-03-10T16:45:00Z",
    "description": "Pakistani cuisine is making waves in the fine dining world. Here’s how top chefs are redefining traditional dishes."
  },
  {
    "_id": "5",
    "title": "How to Make Authentic Pakistani Karahi at Home",
    "thumb": "karahi.jpg",
    "post_by": "Desi Food Lovers",
    "date": "2025-03-08T18:00:00Z",
    "description": "Step-by-step guide to making restaurant-style Chicken and Mutton Karahi with rich flavors and perfect spices."
  },
  {
    "_id": "6",
    "title": "Desi Breakfast Delights: Halwa Puri & More",
    "thumb": "halwa-puri.jpg",
    "post_by": "Lahori Food Vibes",
    "date": "2025-03-18T10:15:00Z",
    "description": "A guide to Pakistan's favorite breakfast dishes, featuring Halwa Puri, Nihari, and Chana Chaat."
  },
  {
    "_id": "7",
    "title": "The Rise of Pakistani Fine Dining",
    "thumb": "fine-dining.jpg",
    "post_by": "Gourmet Pakistan",
    "date": "2025-03-10T16:45:00Z",
    "description": "Pakistani cuisine is making waves in the fine dining world. Here’s how top chefs are redefining traditional dishes."
  },
  {
    "_id": "8",
    "title": "How to Make Authentic Pakistani Karahi at Home",
    "thumb": "karahi.jpg",
    "post_by": "Desi Food Lovers",
    "date": "2025-03-08T18:00:00Z",
    "description": "Step-by-step guide to making restaurant-style Chicken and Mutton Karahi with rich flavors and perfect spices."
  }
]


const BlogItem = () => {

  // PAGINATION
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

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

  return (
    <>
      <div className="grid-3">
        {currentItems.length === 0 ? (
          <h3 className="text-center">No items found!</h3>
        ) : (
          currentItems.map((item) => (
            <div className="items shadow">
              <div className="img">
                <img src={"img/blog/b1.jpg"} alt="" />
              </div>
              <div className="text">
                <div className="admin flexSB">
                  <span>
                    <i className="fa fa-user"></i>
                    <label htmlFor="">{item.post_by}</label>
                  </span>
                  <span>
                    <i className="fa fa-calendar-alt"></i>
                    <label htmlFor="">{moment(item.date).format("lll")}</label>
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
      {blogs.length >= 3 && (
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
