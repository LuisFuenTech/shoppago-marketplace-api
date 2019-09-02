import React, { Component } from "react";
import Card from "./Card";

class CardDeck extends Component {
  state = {};
  render() {
    const { categories } = this.props;
    return (
      <div className="card-deck ">
        {categories.map((category, index) => {
          return <Card key={index} category={category}></Card>;
        })}
      </div>
    );
  }
}

export default CardDeck;
