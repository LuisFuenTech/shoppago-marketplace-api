import React, { Component } from "react";
import { Link } from "react-router-dom";

class Category extends Component {
  render() {
    const { products, category } = this.props;
    return (
      <div className="container-fluid">
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
                    <h5>{`Category: ${category}`}</h5>
                  </center>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Category;
