import React, { Component } from "react";
import { Link } from "react-router-dom";

class Item extends Component {
  render() {
    const { products } = this.props;
    return (
      <div className="container-fluid">
        <center>
          <ul className="">
            {products &&
              products.map((product, index) => {
                return (
                  <li className="miniature">
                    <center>
                      <Link
                        style={{ "text-decoration": "none", color: "#692a70" }}
                        key={index}
                        to={`/product-detail/category/${product.product._id ||
                          ""}`}
                      >
                        <img
                          alt=""
                          style={{ width: "250px", height: "250px" }}
                          className="img-thumb"
                          src={product.product.image || ""}
                          rounded
                        ></img>
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
