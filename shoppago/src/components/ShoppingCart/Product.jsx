import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Product extends Component {
  state = {};
  render() {
    const { product, onRemoveItem, onIncrement, onDecrement } = this.props;
    return (
      <div className="container-fluid">
        <center>
          <img
            alt=""
            style={{ width: "250px", height: "250px" }}
            className="img-thumb"
            src={product.product.image || ""}
            rounded
          ></img>
          <h4>{product.product.name}</h4>
          <h5 className="mb-2 text-muted">{product.product.price}</h5>
          {product.count > 0 ? (
            <button
              onClick={onDecrement}
              className="btn btn-primary btn-sm m-r"
            >
              -
            </button>
          ) : (
            <button className="btn btn-primary btn-sm m-r" disabled>
              -
            </button>
          )}
          <button onClick={onIncrement} className="btn btn-primary btn-sm m-2">
            +
          </button>
          <span className="badge badge-primary badge-pill">
            {product.count}
          </span>
          <p>{"Stock: " + product.product.quantity}</p>
          <Button variant="danger" onClick={onRemoveItem}>
            Delete
          </Button>
        </center>
      </div>
    );
  }
}

export default Product;
