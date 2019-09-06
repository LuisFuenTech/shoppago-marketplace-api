import React, { Component } from "react";
import axios from "axios";
import Category from "./Category";
import Loading from "./../Loading";

class ProductList extends Component {
  state = {
    products: {},
    category: ""
  };

  async componentDidUpdate() {
    if (this.state.category !== this.props.match.params.category) {
      const { category } = this.props.match.params;
      try {
        const { data } = await axios.get(`https://shoppago-market.herokuapp.com/api/category/${category}`);

        this.setState({ products: data, category: category });
      } catch (error) {}
    }
  }

  async componentDidMount() {
    const { category } = this.props.match.params;
    try {
      const { data } = await axios.get(`https://shoppago-market.herokuapp.com/api/category/${category}`);

      this.setState({ products: data, category: category });
    } catch (error) {}
  }

  render() {
    const { products, category } = this.state;

    return Boolean(products.length) ? (
      <div align="center">
        <Category products={products} category={category} />
      </div>
    ) : (
      <Loading message={"Meanwhile in a galaxy far far away..."} />
    );
  }
}

export default ProductList;
