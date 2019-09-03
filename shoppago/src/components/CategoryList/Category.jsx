import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

class Category extends Component {
  render() {
    const { products, category } = this.props;
    return (
      <div className="container-fluid">
        <ul className="miniature-list">
          {products &&
            products.map((product, index) => {
              return (
                <li className="miniature list-group-item-action">
                  <img
                    className="img-thumb"
                    src={product.product.image || ""}
                    rounded
                  ></img>
                  <Link
                    key={index}
                    to={`/product-detail/category/${product.product._id || ""}`}
                  >
                    <h4>{product.product.name}</h4>
                  </Link>
                  <h5 className="mb-2 text-muted">
                    {product.product.price || ""}
                  </h5>
                  <p>{product.product.description || ""}</p>
                  <hr className="my-4"></hr>
                  <p className="mb-2 text-muted">
                    Stock: {product.product.quantity || ""}
                  </p>
                  <h5>{`Category: ${category}`}</h5>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Category;
