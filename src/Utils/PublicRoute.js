import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { getToken } from "./Common";

export default function PublicRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();

  if (!getToken()) {
  } else {
    navigate("/feeds");
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
