import React, { Component } from "react";

require("./loader.css");

export default class Loader extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="loader-main-hp">
        <div
          className={
            "loader-hp " +
            (this.props.smaller ? "small " : null) +
            (this.props.invert ? "inverted " : null)
          }
        ></div>
      </div>
    );
  }
}