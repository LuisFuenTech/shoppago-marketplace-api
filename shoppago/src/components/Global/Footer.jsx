// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";

// Assets
import "./Global.css";

class Footer extends Component {
  render() {
    const { copyright = "&copy; React 2019" } = this.props;

    return (
      <div className="Footer">
        <p dangerouslySetInnerHTML={{ __html: copyright }} />
      </div>
    );
  }
}

Footer.propTypes = {
  copyright: PropTypes.string
};

export default Footer;
