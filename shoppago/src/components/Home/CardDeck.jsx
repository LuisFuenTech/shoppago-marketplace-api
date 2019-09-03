import React, { Component } from "react";
import Card from "./Card";

class CardDeck extends Component {
  state = {};
  render() {
    const { categories } = this.props;
    return (
      <li className="miniature">
        {categories.map((category, index) => {
          return <Card key={index} category={category}></Card>;
        })}
      </li>
    );
  }
}

export default CardDeck;
