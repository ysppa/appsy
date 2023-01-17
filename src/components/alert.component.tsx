import React, { useEffect, useState } from "react";
import "./alert.component.css";

export default function Alert(props: any) {
  const [state, setState] = useState({
    color: props.color ? props.color : "info",
    message: props.message ? props.message : "",
    time: props.time ? props.time : 5000,
    show: props.show || false,
  });

  const hide = () => {
    setState({ ...state, show: false });
  };

  const icon = () => {
    switch (state.color) {
      case "success":
        return "check2-all";

      case "danger":
        return "exclamation-octagon";

      case "warning":
        return "exclamation-triangle";

      default:
        return "info-circle";
    }
  };

  useEffect(() => {
    setState({ ...state, ...props });

    return () => {};
  }, [props]);

  return (
    <>
      <div
        className={`Alert alert alert-${
          state.color
        } alert-dismissible border border-${state.color} ${
          state.show ? "show" : ""
        }`}
        role="alert"
      >
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={() => hide()}
        ></button>
        <strong className="text-capitalize">
          <span className={`bi bi-${icon()}`}></span>
        </strong>{" "}
        {state.message}
      </div>
    </>
  );
}
