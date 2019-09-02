//Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { InputGroup, DropdownButton, Dropdown } from "react-bootstrap";

class Header extends Component {
  state = {
    shoppingCounter: 0
  };

  componentDidMount() {
    this.setState({ shoppingCounter: this.props.counter });
  }

  render() {
    const { items, categories, counter, onChange, onSubmit } = this.props;

    return (
      <div className="sticky-top custom-nav">
        <div>
          <div className="row">
            <div className="col-9">
              <form onSubmit={onSubmit}>
                <div className="input-group mt-3">
                  <div className="input-group-prepend">
                    <DropdownButton
                      as={InputGroup.Prepend}
                      className="custom-button"
                      title="Category"
                      id="input-group-dropdown-1"
                    >
                      {categories &&
                        categories.map((category, index) => {
                          return (
                            <Dropdown.Item key={index}>
                              <Link
                                to={`/by-category/${category.name.toLowerCase()}`}
                              >
                                {category.name}
                              </Link>
                            </Dropdown.Item>
                          );
                        })}
                    </DropdownButton>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="basic-addon2"
                    onChange={onChange}
                  ></input>

                  <div className="input-group-append">
                    <button type="submit" className="btn custom-button">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-light custom-nav navbar-expand">
          <Link className="navbar-brand nav-item-custom" to="/">
            <img
              src="https://res.cloudinary.com/test-dev/image/upload/v1567369877/shopping-512_cfhh1y.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            ></img>
            <span> </span>
            Shoppago Market
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              {items &&
                items.map((item, key) => {
                  return (
                    <li className="nav-item-custom" key={key}>
                      <NavLink
                        className="nav-link nav-item-custom"
                        to={item.url}
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>

            <Link
              to="/shopping-cart"
              className="btn custom-button my-2 my-sm-0"
              type="button"
            >
              <span className="badge badge-pill badge-light">{counter}</span>
              <img
                src="https://res.cloudinary.com/test-dev/image/upload/v1567441340/shopping-cart_hdri5c.png"
                width="35"
                height="30"
                className="d-inline-block align-top"
                alt=""
              ></img>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  items: PropTypes.array.isRequired
};

export default Header;
