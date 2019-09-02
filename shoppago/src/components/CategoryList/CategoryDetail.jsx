import React, { Component } from "react";
import { Image } from "react-bootstrap";

class CategoryDetail extends Component {
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

  getProduct = (props, _id) => {
    const product = props.products.filter(item => item._id === _id);
    return product[0];
  };

  render() {
    const { onAddItem } = this.props;

    const product = this.getProduct(this.props, this.props.match.params._id);

    return (
      <div className="jumbotron">
        <div className="row">
          <div className="col-4">
            <Image src={product.image} rounded />
          </div>
          <div className="col">
            <h2 className="display-4">{product.name}</h2>
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
    );
  }
}

export default CategoryDetail;
