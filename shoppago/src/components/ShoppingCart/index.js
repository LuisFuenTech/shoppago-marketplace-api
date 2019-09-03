import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";
import SubTotal from "./SubTotal";
import Message from "../Message";

class ShoppingCart extends Component {
  render() {
    const { onRemoveItem, onIncrement, onDecrement, products } = this.props;

    return Boolean(products.length) ? (
      <Container fluid>
        <ul className="miniature-list">
          {products &&
            products.map((product, index) => {
              return (
                <li className="miniature" key={index}>
                  <Product
                    key={index}
                    product={product}
                    onRemoveItem={() => onRemoveItem(product)}
                    onIncrement={() => onIncrement(product)}
                    onDecrement={() => onDecrement(product)}
                  />
                </li>
              );
            })}
        </ul>
        <Col xs={3}>
          <SubTotal products={products} />
        </Col>
      </Container>
    ) : (
      <Message message={"Cart is empty!"} />
    );
  }
}

export default ShoppingCart;
