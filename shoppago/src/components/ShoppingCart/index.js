import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";
import SubTotal from "./SubTotal";
import Message from "../Message";

class ShoppingCart extends Component {
  render() {
    const { onRemoveItem, onIncrement, onDecrement, products } = this.props;

    return Boolean(products.length) ? (
      <center>
        <Container fluid>
          <Row>
            <ul className="list-group">
              {products &&
                products.map((product, index) => {
                  return (
                    <li className="list-group-item" key={index}>
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
          </Row>
        </Container>
      </center>
    ) : (
      <Message message={"Cart is empty!"} />
    );
  }
}

export default ShoppingCart;
