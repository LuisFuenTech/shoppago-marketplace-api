import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselHome = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          style={{ height: "1024px", width: "720px" }}
          className="d-block w-100 h-25"
          src="https://res.cloudinary.com/test-dev/image/upload/v1567446287/descarga_mryi4y.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/test-dev/image/upload/v1567446388/walking_for_health_1_eztlcb.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/test-dev/image/upload/v1567446563/descarga_1_qb5pti.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHome;
