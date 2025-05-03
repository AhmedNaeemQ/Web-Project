import React from 'react'
import { motion } from 'framer-motion';


const Banner = ({title, subtitle}) => {
  return (
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
      <p className="text-uppercase text-warning small mb-2">{title}</p>
      <h1 className="display-4 fw-bold">{subtitle}</h1>
      <hr
        className="border-warning mx-auto"
        style={{ width: '80px', borderTopWidth: '3px' }}
      />
    </motion.div>
  </section>
  )
}

export default Banner
