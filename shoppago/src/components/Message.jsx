import React from "react";

const Message = props => {
  return (
    <div className="jumbotron">
      <center>
        <h1 className="display-4">{props.message}</h1>
      </center>
    </div>
  );
};

export default Message;
