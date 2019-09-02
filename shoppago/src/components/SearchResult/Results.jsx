import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class Result extends Component {
  render() {
    const { results } = this.props;
    return (
      <Container fluid>
        <ul className="list-group">
          {results &&
            results.map((result, index) => {
              return (
                <li className="list-group-item list-group-item-action">
                  <Row>
                    <Col xs={6} md={4}>
                      <img
                        alt="..."
                        src={result.image}
                        className="rounded img-thumbnail"
                      ></img>
                    </Col>
                    <Col xs={6} md={4}>
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Title>
                            <Link to={`/product-detail/${result._id}`}>
                              {result.description
                                .split(" ")
                                .slice(0, 3)
                                .join(" ")}
                            </Link>
                          </Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            {result.price}
                          </Card.Subtitle>
                          <Card.Text>{result.description}</Card.Text>
                          <hr className="my-4"></hr>
                          <Card.Subtitle className="mb-2 text-muted">
                            Stock: {result.quantity || ""}
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

export default Result;
