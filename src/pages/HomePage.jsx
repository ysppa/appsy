import React, { useEffect, useState } from "react";
import logo from "./../logo.svg";
import { Link } from "react-router-dom";
import FeedsPage from "./FeedsPage";

export default function HomePage(props) {
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    setAuthState(props.auth.state);

    return () => {};
  }, [props]);

  return (
    <>
      {authState.userSignedIn ? (
        <FeedsPage
          auth={{ state: authState }}
          modal={props.modal}
          setModalProps={props.setModalProps}
        />
      ) : (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5>Welcome {authState.user ? authState.user.username : ""}</h5>
          {!authState.userSignedIn ? (
            <div>
              <section className="d-flex justify-content-center">
                <aside>
                  <Link to={"/login"} className="btn btn-primary">
                    Login
                  </Link>
                </aside>
                <aside className="ms-4">
                  <Link to={"/register"} className="btn btn-link">
                    Sign up
                  </Link>
                </aside>
              </section>
            </div>
          ) : (
            <></>
          )}
        </header>
      )}
    </>
  );
}
