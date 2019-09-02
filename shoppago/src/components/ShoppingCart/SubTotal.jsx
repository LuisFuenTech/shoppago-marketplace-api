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

  componentDidMount() {
    console.log("Did mount");
    //localStorage.clear();
  }

  componentDidUpdate() {
    console.log("Did updated");
  }

  handleSubmit = async event => {
    event.preventDefault();
    alert(this.state.email);
    try {
      await axios.post("/api/shopping/buy", {
        cart: localStorage.getItem("productsCart"),
        subtotal: this.getTotalPriceFixed(this.props.products),
        email: this.state.email
      });

      alert("OutSide try");
      localStorage.clear();
      const alv = localStorage.getItem("productsCart");
      localStorage.clear();
      alert(alv);

      this.setState({ redirectToHome: true });
    } catch (error) {
      console.log(error);
      alert("Some errors", error);
    }
    //this.props.history.push("/home");
  };

  getTotalPriceFixed = products => {
    const total = products.reduce((acum, item) => {
      return acum + item.priceFormated * item.count;
    }, 0);
    return total.toFixed(2);
  };

  handleOnChange = event => {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  };

  render() {
    console.log("Render Shopping");
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

          <button type="submit" className="btn btn-primary">
            <i className="fas fa-money-check-alt"></i> Buy
          </button>
        </form>
      </div>
    );
  }
}

export default SubTotal;
