import React from "react";
import { Route, useLocation, useNavigate } from "react-router-dom";
import { getToken } from "./Common";
import store from "./../services/storage.service";

// handle the private routes
export default function PrivateRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();
  if (getToken()) {
  } else {
    navigate("/login");
    store.set("nextUrl", location.pathname);
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
