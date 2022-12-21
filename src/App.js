import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Dropdown } from "bootstrap";

class App extends Component {
  componentDidMount() {
    new Dropdown(".dropdown", {});
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-dark px-4 bg-dark navbar-expand-lg">
          <Link className="navbar-brand" to="/">
            Appsy
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="" aria-current="page">
                  Home <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account
                </Link>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <Link className="dropdown-item" to="/register">
                    Sign in
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                </div>
              </li>
            </ul>
            <form className="d-flex my-2 my-lg-0">
              <input
                className="form-control me-sm-2"
                type="text"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
