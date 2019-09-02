import React from "react";
import CarouselHome from "./Carousel";
import CardDeck from "./CardDeck";

const Home = props => {
  const { categories } = props;
  return (
    <div className="max-width">
      <CardDeck categories={categories.slice(0, 3)} />
      <br></br>
      <CardDeck categories={categories.slice(3, 6)} />
      <br></br>
      <CardDeck categories={categories.slice(6)} />
      <br></br>
      <CarouselHome />
    </div>
  );
};

export default Home;
