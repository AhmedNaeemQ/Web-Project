import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const categories = [
  {
    "id": 1,
    "title": "Fast Food",
    "thumb": "fast-food.jpg"
  },
  {
    "id": 2,
    "title": "Healthy",
    "thumb": "healthy.jpg"
  },
  {
    "id": 3,
    "title": "Desserts",
    "thumb": "desserts.jpg"
  },
  {
    "id": 4,
    "title": "Beverages",
    "thumb": "beverages.jpg"
  },
  {
    "id": 5,
    "title": "Seafood",
    "thumb": "seafood.jpg"
  },
  {
    "id": 6,
    "title": "Vegan",
    "thumb": "vegan.jpg"
  },
  {
    "id": 7,
    "title": "BBQ",
    "thumb": "bbq.jpg"
  },
  {
    "id": 8,
    "title": "Bakery",
    "thumb": "bakery.jpg"
  },
  {
    "id": 9,
    "title": "Pasta",
    "thumb": "pasta.jpg"
  },
  {
    "id": 10,
    "title": "Sushi",
    "thumb": "sushi.jpg"
  },
  {
    "id": 11,
    "title": "Mexican",
    "thumb": "mexican.jpg"
  },
  {
    "id": 12,
    "title": "Italian",
    "thumb": "italian.jpg"
  },
  {
    "id": 13,
    "title": "Indian",
    "thumb": "indian.jpg"
  },
  {
    "id": 14,
    "title": "Chinese",
    "thumb": "chinese.jpg"
  },
  {
    "id": 15,
    "title": "Thai",
    "thumb": "thai.jpg"
  }
]

const CategoriesItem = () => {


  // Pagination
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = categories.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % categories.length;
    setItemOffset(newOffset);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="grid-4">
        {currentItems.length === 0 ? (
          <h3 className="text-center">No items found!</h3>
        ) : (
          currentItems.map((item) => (
            <div className="items shadow">
              <Link to={"/category-food/" + item.title}>
                <div class="box-3 float-container">
                  <div className="category-thumb text-center">
                    <img
                      src={"img/category/sandwich.jpg"}
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
      {categories.length >= 13 && (
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

export default CategoriesItem;
