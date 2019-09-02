import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="jumbotron">
      <center>
        <h1 className="display-4">
          {
            "Your looking for something that doesn't exits, like your chrush's love :("
          }
        </h1>
        <br></br>
        <Link to="/">
          <button className="btn btn-lg custom-button ">
            Let's go home, I'll bring you coffee
          </button>
        </Link>
      </center>
    </div>
  );
};

export default NotFound;
