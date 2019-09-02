import React from "react";

const Contact = () => {
  return (
    <div className="jumbotron">
      <center>
        <h4 className="display-4">{"In a galaxy far far away..."}</h4>
        <h5>
          There was a guy who was responsible for create this web application by
          means of his knowledge so far.
        </h5>
        <h5>You can checkout the code of this proyect:</h5>

        <a
          href="https://github.com/LuisFuenTech/shoppago-marketplace"
          target="_blank"
        >
          <img
            style={{ width: "100px", height: "100px" }}
            alt="luis fuentes condorlabs"
            src="https://res.cloudinary.com/test-dev/image/upload/v1567455867/github_1_eizmvy.png"
          ></img>
        </a>
      </center>
    </div>
  );
};

export default Contact;
