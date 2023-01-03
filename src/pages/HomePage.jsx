import React, { useEffect, useState } from "react";
import logo from "./../logo.svg";

export default function HomePage(props) {
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    setAuthState(props.auth.state);

    return () => {};
  }, [props]);

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h5>Welcome {authState.user ? authState.user.username : ""}</h5>
        <p>
          Edit <code>src/pages/HomePage.jsx</code> and save to reload.
        </p>
      </header>
    </>
  );
}
