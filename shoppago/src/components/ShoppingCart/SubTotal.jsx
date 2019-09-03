import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";

class SubTotal extends Component {
  state = {
    totalItems: 0,
    totalPrice: 0,
    email: "",
    redirectToHome: false
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post(
        "https://shoppago-market.herokuapp.com/api/shopping/buy",
        {
          cart: localStorage.getItem("productsCart"),
          subtotal: this.getTotalPriceFixed(this.props.products),
          email: this.state.email
        }
      );
      this.props.history.push("/mail-sent");
    } catch (error) {
      this.props.history.push("/shopping-cart");
    }
  };

  getTotalPriceFixed = products => {
    const total = products.reduce((acum, item) => {
      return acum + item.priceFormated * item.count;
    }, 0);
    return total.toFixed(2);
  };

  handleOnChange = event => {
    this.setState({ email: event.target.value });
  };

  handleClick = () => {
    this.props.history.push("/not-found");
  };

  render() {
    const { products } = this.props;

    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>Subtotal</h1>
        <h2>Items: {products.length}</h2>
        <h2>USD {this.getTotalPriceFixed(products)}</h2>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              onChange={this.handleOnChange}
              type="email"
              className="form-control"
              placeholder="email"
              required
            ></input>
          </div>

          <button type="submit" className="btn button-buy">
            <i className="fas fa-money-check-alt"></i> Buy
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(SubTotal);
