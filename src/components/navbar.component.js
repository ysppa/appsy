import { Dropdown } from "bootstrap";
import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.component.css";
import authReducer from "../reducers/auth.reducer";
import authService from "../services/auth.service";

export default function Navbar(props) {
  const [auth, authDispatch] = useReducer(authReducer, {});
  const [authState, setAuthState] = useState(auth);
  const location = useLocation();

  useEffect(() => {
    setAuthState(props.auth.state);

    return () => {};
  }, [props]);

  useEffect(() => {
    if (authState.userSignedIn) {
      new Dropdown(".dropdown", {});
    } else {
    }

    return () => {};
  }, []);

  return (
    <>
      {authState.userSignedIn ? (
        <div className="px-xl-5 bg-primary">
          <nav className="navbar navbar-expand-lg px-4 px-xl-5 py-xl-0">
            <Link className="navbar-brand" to="/">
              Appsy
            </Link>
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item ms-3">
                <Link className="nav-link" to="/home" aria-current="page">
                  <span className="bi bi-house"></span>
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link" to="/feeds" aria-current="page">
                  <span className="bi bi-newspaper"></span>
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link" to="/" aria-current="page">
                  <span className="bi bi-pencil-square"></span>
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link" to="/" aria-current="page">
                  <span className="bi bi-people"></span>
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link" to="/" aria-current="page">
                  <span className="bi bi-bell"></span>
                </Link>
              </li>
            </ul>
            <form className="flex-grow-1 d-flex bg-white rounded my-2 my-lg-0 ms-3">
              <span className="bi bi-search text-black-50 ms-2"></span>
              <input
                className="form-control border-0 me-sm-2"
                type="text"
                placeholder="Search"
              />
            </form>
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
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item dropdown">
                  <button
                    className="nav-link btn btn-link bi bi-person ms-3"
                    type="button"
                    id="dropdownId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></button>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownId"
                  >
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link
                      onClick={() => {
                        authService.logout();
                        authDispatch({ type: "logout" });
                      }}
                      className="dropdown-item"
                      to="/logout"
                    >
                      Logout
                    </Link>
                  </div>
                </li>
                {location.pathname.includes("/space/") ? (
                  <li className="nav-item d-flex align-items-center">
                    <Link
                      className="btn btn-danger rounded-pill ms-3"
                      type="button"
                    >
                      Add new question
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </nav>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
