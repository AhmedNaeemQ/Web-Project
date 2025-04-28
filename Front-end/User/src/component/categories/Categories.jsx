import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    axios
      .get('http://localhost:1000/api/admin/categories')
      .then(({ data }) => setCategories(data))
      .catch(console.error);
  }, []);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = categories.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setItemOffset((selected * itemsPerPage) % categories.length);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, type: 'spring', stiffness: 120 }
    }),
    hover: { scale: 1.05, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }
  };

  return (
    <>

      <section
        className="position-relative text-center text-white"
        style={{
          backgroundImage: 'url("/restaurant-banner.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingTop: '150px', 
          paddingBottom: '3rem',
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        />
        <motion.div
          className="position-relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-uppercase text-warning small mb-2">Our Menu</p>
          <h1 className="display-4 fw-bold">Explore Categories</h1>
          <hr
            className="border-warning mx-auto"
            style={{ width: '80px', borderTopWidth: '3px' }}
          />
        </motion.div>
      </section>

      <section className="py-5 bg-white text-light">
  <div className="container">
    <div className="d-flex flex-wrap justify-content-center gap-4">
      <AnimatePresence initial={false}>
        {currentItems.length === 0 ? (
          <div className="col-12">
            <h3 className="text-center">No categories found!</h3>
          </div>
        ) : (
          currentItems.map((cat, idx) => (
          <motion.div
            key={cat._id || idx}
            custom={idx}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
            className="category-item"
            style={{
              flex: '1 1 calc(25% - 1rem)', 
              minWidth: '300px', 
              maxWidth: '300px',
            }} 
          >
            <Link to={`/category-food/${cat.title}`} className="text-decoration-none">
              <div className="card overflow-hidden border border-warning rounded shadow-lg h-100 position-relative">
                
                <img
                  src={`/categories/${cat.thumb}`}
                  alt={cat.title}
                  className="card-img-top"
                  style={{
                    objectFit: 'cover',
                    height: '150px', 
                    width: '100%',   
                  }}
                />

                {cat.featured === "on" && (
                  <div className="badge bg-warning text-dark position-absolute top-0 end-0 m-3">
                    Featured
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center mb-3">{cat.title}</h5>

                  <Link
                    to={`/category-food/${encodeURIComponent(cat.title)}`}
                    className="btn btn-warning w-100"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </Link>
          </motion.div>


          ))
        )}
      </AnimatePresence>
    </div>

    {categories.length > itemsPerPage && (
      <div className="d-flex justify-content-center mt-5">
        <ReactPaginate
          breakLabel="..."
          nextLabel="›"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="‹"
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item disabled"
          breakLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    )}
  </div>
</section>

    </>
  );
};

export default Categories;
