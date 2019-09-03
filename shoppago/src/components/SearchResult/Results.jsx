import React, { Component } from "react";
import { Link } from "react-router-dom";

class Result extends Component {
  render() {
    const { results } = this.props;
    return (
      <div className="container-fluid">
        <center>
          <ul className="miniature-list">
            {results &&
              results.map((result, index) => {
                return (
                  <li className="miniature list-group-item-action">
                    <center>
                      <img
                        alt=""
                        style={{ width: "250px", height: "250px" }}
                        className="img-thumb"
                        src={results.image || ""}
                        rounded
                      ></img>
                      <Link
                        style={{ "text-decoration": "none", color: "#692a70" }}
                        key={index}
                        to={`/product-detail/category/${results._id || ""}`}
                      >
                        <h4>{results.name}</h4>
                      </Link>
                      <h5 className="mb-2 text-muted">{results.price || ""}</h5>
                      <p>{results.description || ""}</p>
                      <hr className="my-4"></hr>
                      <p className="mb-2 text-muted">
                        Stock: {results.quantity || ""}
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

export default Result;
