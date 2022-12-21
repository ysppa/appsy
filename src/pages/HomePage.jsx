import React, { Component } from "react";
import logo from "./../logo.svg";

export default class HomePage extends Component {
  render() {
    return (
      <>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/pages/HomePage.jsx</code> and save to reload.
          </p>
        </header>
      </>
    );
  }
}
