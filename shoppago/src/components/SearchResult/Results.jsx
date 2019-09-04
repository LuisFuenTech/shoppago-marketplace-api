import React, { Component } from "react";
import { Link } from "react-router-dom";

class Result extends Component {
  render() {
    const { results } = this.props;
    return (
      <div className="container-fluid">
        <center>
          <ul className="">
            {results &&
              results.map((result, index) => {
                return (
                  <li className="miniature">
                    <center>
                      <Link
                        style={{ "text-decoration": "none", color: "#692a70" }}
                        key={index}
                        to={`/product-detail/category/${result._id || ""}`}
                      >
                        <img
                          alt=""
                          style={{ width: "250px", height: "250px" }}
                          className="img-thumb"
                          src={result.image || ""}
                          rounded
                        ></img>
                        <h4>{result.name}</h4>
                      </Link>
                      <h5 className="mb-2 text-muted">{result.price || ""}</h5>
                      <p>{result.description || ""}</p>
                      <hr className="my-4"></hr>
                      <p className="mb-2 text-muted">
                        Stock: {result.quantity || ""}
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
