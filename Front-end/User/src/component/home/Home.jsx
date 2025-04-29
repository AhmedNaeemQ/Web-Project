import React from "react";
import HBlog from "./HBlog";
import HCategories from "./HCategories";
import HFood from "./HFood";
import HeroBanner from "./HeroBanner";
import Reservation from "../reservations/Reservation";

export const Home = () => {
  return (
    <>
      <HeroBanner/>
      <HCategories />
      <HFood />
      <HBlog />
      <Reservation/>
    </>
  );
};
