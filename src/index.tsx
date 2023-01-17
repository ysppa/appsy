import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const rootEl = document.getElementById("root");
if (rootEl !== null) {
  const root = createRoot(rootEl);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
  serviceWorkerRegistration.register();
}
