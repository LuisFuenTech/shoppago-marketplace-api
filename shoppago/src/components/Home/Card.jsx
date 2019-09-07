import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  state = {};
  render() {
    const { category } = this.props;
    return (
      <Link
        style={{ "text-decoration": "none", color: "#692a70" }}
        to={`/by-category${category.url}`}
      >
        <center>
          <img
            style={{ width: "250px", height: "250px" }}
            src={category.image}
            className="img-thumb"
            alt="..."
          ></img>
        </center>
        <center>
          <h5 className="card-title mt-2">{category.name.toUpperCase()}</h5>
        </center>
      </Link>
    );
  }
}

export default Card;
