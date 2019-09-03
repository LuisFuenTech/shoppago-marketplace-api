import React, { Component } from "react";
import Message from "./Message";

class Detail extends Component {
  state = {
    product: {}
  };

  componentDidMount() {
    const { products } = this.props;
    const product = products.filter(
      item => item._id === this.props.match.params._id
    );
    this.setState({ product: product[0] });
  }

  getProduct = (products, _id) => {
    return products.filter(item => item._id === _id)[0];
  };

  render() {
    const { onAddItem, products } = this.props;

    const product = this.getProduct(
      this.props.products,
      this.props.match.params._id
    );

    return (
      <div>
        {products.length > 0 ? (
          <div className="jumbotron">
            <div className="row">
              <div className="col-4">
                <img
                  style={{ height: "300px", width: "300px" }}
                  src={product.image}
                  alt=""
                ></img>
              </div>
              <div className="col">
                <h2 className="display-4">
                  {product.description
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}
                </h2>
                <h3>{product.price}</h3>
                <h3 className="lead">{product.description}</h3>
                <hr className="my-4"></hr>
                {product.inCart ? (
                  <button className="btn btn-primary btn-lg" disabled>
                    <i className="fas fa-cart-plus"></i> In Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => onAddItem(product)}
                  >
                    <i className="fas fa-cart-plus"></i> Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Message message={"Meanwhile in a galaxy far far away..."} />
        )}
      </div>
    );
  }
}

export default Detail;
