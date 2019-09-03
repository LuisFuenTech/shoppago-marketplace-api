import React, { Component } from "react";
import { Link } from "react-router-dom";

class Item extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="container-fluid">
        <center>
          <ul className="miniature-list">
            {products &&
              products.map((product, index) => {
                return (
                  <li className="miniature list-group-item-action">
                    <center>
                      <img
                        alt=""
                        style={{ width: "250px", height: "250px" }}
                        className="img-thumb"
                        src={product.image || ""}
                        rounded
                      ></img>
                      <Link
                        style={{ "text-decoration": "none", color: "#692a70" }}
                        key={index}
                        to={`/product-detail/category/${product._id || ""}`}
                      >
                        <h4>{product.name}</h4>
                      </Link>
                      <h5 className="mb-2 text-muted">{product.price || ""}</h5>
                      <p>{product.description || ""}</p>
                      <hr className="my-4"></hr>
                      <p className="mb-2 text-muted">
                        Stock: {product.quantity || ""}
                      </p>
                    </center>
                  </li>
                );
              })}
          </ul>
        </center>
      </div>
    );
  }
}

export default Item;
