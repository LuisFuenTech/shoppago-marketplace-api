import React, { Component } from "react";
import Item from "./Item";

class ProductList extends Component {
  render() {
    const { products } = this.props;

    return <Item products={products} />;
  }
}

export default ProductList;
