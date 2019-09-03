import React from "react";
import CarouselHome from "./Carousel";
import CardDeck from "./CardDeck";

const Home = props => {
  const { categories } = props;
  return (
    <div align="center">
      <ul className="miniature-list">
        <CardDeck categories={categories.slice(0, 3)} />
        <CardDeck categories={categories.slice(3, 6)} />
        <CardDeck categories={categories.slice(6)} />
      </ul>
      <CarouselHome />
    </div>
  );
};

export default Home;
