import React, { Component } from "react";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";

class Product extends Component {
  state = {};
  render() {
    const { product, onRemoveItem, onIncrement, onDecrement } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <Image src={product.image} rounded />
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  {product.description
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {product.price}
                </Card.Subtitle>
                {product.count > 0 ? (
                  <button
                    onClick={onDecrement}
                    className="btn btn-primary btn-sm m-r"
                  >
                    -
                  </button>
                ) : (
                  <button className="btn btn-primary btn-sm m-r" disabled>
                    -
                  </button>
                )}
                <button
                  onClick={onIncrement}
                  className="btn btn-primary btn-sm m-2"
                >
                  +
                </button>
                <span className="badge badge-primary badge-pill">
                  {product.count}
                </span>
                <Card.Text>{"Stock: " + product.quantity}</Card.Text>
                <Button variant="danger" onClick={onRemoveItem}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Product;
