import React, { Component } from "react";
import Results from "./Results";

class SearchList extends Component {
  render() {
    const { results } = this.props;

    return <Results results={results} />;
  }
}

export default SearchList;
