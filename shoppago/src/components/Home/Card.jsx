import React, { Component } from "react";
import { Link } from "react-router-dom";

class Card extends Component {
  state = {};
  render() {
    const { category } = this.props;
    return (
      <div className="card w-25">
        <Link
          style={{ "text-decoration": "none" }}
          to={`/by-category${category.url}`}
        >
          <center>
            <img
              style={{ width: "300px", height: "300px" }}
              src={category.image}
              className="card-img-top img-fluid"
              alt="..."
            ></img>
          </center>
          <center>
            <h5 className="card-title mt-2">{category.name}</h5>
          </center>
        </Link>
      </div>
    );
  }
}

export default Card;
