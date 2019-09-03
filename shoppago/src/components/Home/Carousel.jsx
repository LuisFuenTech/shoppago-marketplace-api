import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const CarouselHome = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          style={{ height: "1024px", width: "720px" }}
          className="d-block w-100 h-25"
          src="https://res.cloudinary.com/test-dev/image/upload/c_scale,h_785,w_1920/v1567446287/descarga_mryi4y.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <Link
            style={{ color: "#ffffff", "text-decoration": "none" }}
            to="/by-category/consoles"
          >
            <h3>It's better with friends</h3>
            <p>
              No matter which videogame console you use, just get the high score
            </p>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/test-dev/image/upload/v1567446388/walking_for_health_1_eztlcb.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <Link
            style={{ color: "#000000", "text-decoration": "none" }}
            to="/by-category/beauty"
          >
            <h3>Anytime, anywhere</h3>
            <p>Never is late for working out</p>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/test-dev/image/upload/c_scale,h_785,w_1920/v1567446563/descarga_1_qb5pti.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <Link
            style={{ color: "#ffffff", "text-decoration": "none" }}
            to="/by-category/living"
          >
            <h3>Stay home</h3>
            <p>All you need maybe is a Netflix account and a UHD TV</p>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHome;
