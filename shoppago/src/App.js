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
    searchResult: []
  };

  async componentDidMount() {
    console.log("App did mount");
    /* if(!localStorage.getItem('productsCart')){

    }else{

    } */
    localStorage.getItem("productsCart") &&
      this.setState({
        productsCart: JSON.parse(localStorage.getItem("productsCart")),
        shoppingCounter: JSON.parse(localStorage.getItem("productsCart")).length
      });

    if (!localStorage.getItem("productList")) {
      console.log("no productlist");
      try {
        const { data } = await axios.get("/api/product/products");

        if (data) this.setState({ productList: data });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Using productList from localStorage");
      this.setState({
        productList: JSON.parse(localStorage.getItem("productList"))
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("App will update");
    localStorage.setItem(
      "productsCart",
      JSON.stringify(nextState.productsCart)
    );
    localStorage.setItem("productList", JSON.stringify(nextState.productList));
  }

  handleSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await axios.get(
        `/api/product/search?words=${this.state.search}`
      );
      console.log(data);
      this.setState({ searchResult: data });
      if (data) this.props.history.push("/result-list");
    } catch (error) {
      console.log("Something went wrong with search results", error);
      this.props.history.push("/not-found");
    }
  };

  handleChange = event => {
    console.log(event.target.value);
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
    console.log(product);

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
    console.log("App render");
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