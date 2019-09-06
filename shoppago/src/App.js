//Dependencies
import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, withRouter } from "react-router-dom";

//Data
import navbar from "./data/navbar-data";
import categories from "./data/categories";

//Componennts
import Header from "./components/Global/Header";
import Footer from "./components/Global/Footer";
import Home from "./components/Home/index";
import Contact from "./components/Contact";
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import Detail from "./components/Detail";
import Category from "./components/CategoryList";
import CategoryDetail from "./components/CategoryList/CategoryDetail";
import SearchList from "./components/SearchResult";
import NotFound from "./components/NotFound";
import MailSend from "./components/MailSend";

class App extends Component {
  state = {
    shoppingCounter: 0,
    productsCart: [],
    productList: [],
    search: "",
    searchResult: [],
    emailSent: false
  };

  componentWillMount() {
    localStorage.getItem("productsCart") &&
      this.setState({
        productsCart: JSON.parse(localStorage.getItem("productsCart")),
        shoppingCounter: JSON.parse(localStorage.getItem("productsCart")).length
      });
  }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentDidUpdate(nextProps, nextState) {
    localStorage.setItem("productList", JSON.stringify(nextState.productList));
    localStorage.setItem(
      "productsCart",
      JSON.stringify(nextState.productsCart)
    );
  }

  async componentDidMount() {
    localStorage.getItem("productsCart") &&
      this.setState({
        productsCart: JSON.parse(localStorage.getItem("productsCart")),
        shoppingCounter: JSON.parse(localStorage.getItem("productsCart")).length
      });

    if (!localStorage.getItem("productList")) {
      try {
        const { data } = await axios.get(
          "https://shoppago-market.herokuapp.com/api/product/products"
        );

        if (data) this.setState({ productList: data });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.setState({
        productList: JSON.parse(localStorage.getItem("productList"))
      });
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await axios.get(
        `https://shoppago-market.herokuapp.com/api/product/search?words=${this.state.search}`
      );
      this.setState({ searchResult: data });
      if (data.length > 0) this.props.history.push("/result-list");
      else this.props.history.push("/not-found");
    } catch (error) {
      this.props.history.push("/not-found");
    }
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleAddItem = product => {
    const products = [...this.state.productsCart];
    product.inCart = true;
    product.count = 1;
    products.push(product);

    this.setState({
      shoppingCounter: this.state.shoppingCounter + 1,
      productsCart: products
    });
  };

  handleIncrementItem = product => {
    const products = [...this.state.productsCart];
    const index = products.indexOf(product);
    products[index].count += 1;

    this.setState({
      productsCart: products
    });
  };

  handleDecrementItem = product => {
    const products = [...this.state.productsCart];
    const index = products.indexOf(product);
    products[index].count -= 1;

    if (products[index].count <= 0) {
      this.handleRemoveItem(products[index]);
    } else {
      this.setState({
        productsCart: products
      });
    }
  };

  handleRemoveItem = product => {
    const products = this.state.productsCart.filter(original => {
      product.inCart = false;
      return original._id !== product._id;
    });
    this.setState({
      shoppingCounter: this.state.shoppingCounter - 1,
      productsCart: products
    });
  };
  render() {
    const {
      shoppingCounter,
      productsCart,
      productList,
      searchResult
    } = this.state;

    return (
      <React.Fragment>
        <Header
          items={navbar}
          categories={categories}
          counter={shoppingCounter}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <div className="container-fluid">
          <Switch>
            <Route
              exact
              path="/"
              component={props => <Home {...props} categories={categories} />}
            />
            <Route
              exact
              path="/product-detail/:_id"
              component={props => (
                <Detail
                  {...props}
                  onAddItem={this.handleAddItem}
                  products={productList}
                />
              )}
            />
            <Route
              exact
              path="/product-detail/category/:_id"
              render={props => (
                <CategoryDetail
                  {...props}
                  onAddItem={this.handleAddItem}
                  products={productList}
                />
              )}
            />
            <Route exact path="/by-category/:category" component={Category} />
            <Route
              exact
              path="/shopping-cart"
              render={props => (
                <ShoppingCart
                  {...props}
                  products={productsCart}
                  onRemoveItem={this.handleRemoveItem}
                  onIncrement={this.handleIncrementItem}
                  onDecrement={this.handleDecrementItem}
                />
              )}
            />
            <Route exact path="/contact" component={Contact} />
            <Route
              exact
              path="/result-list"
              render={props => <SearchList {...props} results={searchResult} />}
            />
            <Route
              exact
              path="/list"
              render={props => (
                <ProductList {...props} products={productList} />
              )}
            />
            <Route exact path="/mail-sent" component={MailSend} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer copyright="&copy; Shoppago Marketplace 2019" />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
