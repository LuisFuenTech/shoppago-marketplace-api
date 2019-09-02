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
          <h1 className="display-4">
            {"Check your email, we just sent you details :)"}
          </h1>
        </center>
      </div>
    );
  }
}

export default MailSend;
