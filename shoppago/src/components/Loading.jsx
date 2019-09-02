import React from "react";

const Loading = props => {
  return (
    <div className="jumbotron">
      <center>
        <h1 className="display-4">{props.message}</h1>
        <br></br>
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </center>
    </div>
  );
};

export default Loading;
