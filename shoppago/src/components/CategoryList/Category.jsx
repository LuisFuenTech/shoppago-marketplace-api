import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

class Category extends Component {
  render() {
    const { products, category } = this.props;
    return (
      <div className="container-fluid">
        <ul className="list-group">
          {products &&
            products.map((product, index) => {
              return (
                <li className="list-group-item list-group-item-action">
                  <Row key={index}>
                    <Col key={index + 2} xs={6} md={4}>
                      <Image
                        key={index}
                        src={product.product.image || ""}
                        rounded
                      />
                    </Col>
                    <Col key={index} xs={6} md={4}>
                      <Card key={index} style={{ width: "18rem" }}>
                        <Card.Body key={index}>
                          <Card.Title key={index}>
                            <Link
                              key={index}
                              to={`/product-detail/category/${product.product
                                ._id || ""}`}
                            >
                              {product.product.description
                                .split(" ")
                                .slice(0, 3)
                                .join(" ") || ""}
                            </Link>
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {product.product.price || ""}
                          </Card.Subtitle>
                          <Card.Text>
                            {product.product.description || ""}
                          </Card.Text>
                          <hr className="my-4"></hr>
                          <Card.Subtitle className="mb-2 text-muted">
                            Stock: {product.product.quantity || ""}
                          </Card.Subtitle>
                          <Card.Text>{`Category: ${category}`}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Category;
