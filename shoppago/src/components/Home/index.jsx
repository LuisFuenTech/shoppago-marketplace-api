import React, { Component } from "react";
import CarouselHome from "./Carousel";
import CardDeck from "./CardDeck";
import Loading from "../Loading";

class Home extends Component {
  render() {
    const cards = [];
    const { categories } = this.props;

    for (let i = 0; i < categories.length; i += 3) {
      cards.push(<CardDeck categories={categories.slice(i, i + 3)} />);
    }

    return categories ? (
      <div align="center">
        <ul className="">{}</ul>
        {cards}
        <CarouselHome />
      </div>
    ) : (
      <Loading message={"Loading..."} />
    );
  }
}

export default Home;
