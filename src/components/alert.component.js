import React, { useEffect, useState } from "react";

export default function Alert(props) {
  const [state, setState] = useState({
    color: props.color ? props.color : "info",
    message: props.message ? props.message : "",
    time: props.time ? props.time : 5000,
  });

  const icon = () => {
    switch (color) {
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

  const { color, message } = state;
  return (
    <>
      {message ? (
        <div
          className={`alert alert-${color} alert-dismissible border border-${color} fade show`}
          role="alert"
        >
          {/* <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button> */}
          <strong className="text-capitalize">
            <span className={`bi bi-${icon()}`}></span>
          </strong>{" "}
          {message}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}