import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

class Item extends Component {
  render() {
    const { products } = this.props;
    return (
      <Container fluid>
        <ul className="list-group">
          {products &&
            products.map((product, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                >
                  <Row>
                    <Col xs={6} md={4}>
                      <img
                        style={{ height: "200px", width: "200px" }}
                        alt="..."
                        src={product.image}
                        className="rounded img-thumbnail"
                      ></img>
                    </Col>
                    <Col xs={6} md={4}>
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Title>
                            <Link to={`/product-detail/${product._id}`}>
                              {product.name}
                            </Link>
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {product.price}
                          </Card.Subtitle>
                          <Card.Text>{product.description}</Card.Text>
                          <hr className="my-4"></hr>
                          <Card.Subtitle className="mb-2 text-muted">
                            Stock: {product.quantity || ""}
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </li>
              );
            })}
        </ul>
      </Container>
    );
  }
}

export default Item;
