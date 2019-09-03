import React, { Component } from "react";

class MailSend extends Component {
  state = {};

  componentDidMount() {
    localStorage.clear();
  }

  render() {
    return (
      <div className="jumbotron">
        <center>
          <img
            style={{ width: "100px", height: "100px" }}
            alt="luis fuentes condorlabs"
            src="https://res.cloudinary.com/test-dev/image/upload/v1567470298/send_puhzam.png"
          ></img>
          <h1 className="display-4">
            {"Check your email, we just sent you details :)"}
          </h1>
        </center>
      </div>
    );
  }
}

export default MailSend;
