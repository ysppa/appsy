import React, { useEffect, useState } from "react";

export default function ModalUI(props: any = {}) {
  const [state, setState] = useState({
    title: "",
  });

  const hide = () => {
    props.modal.hide();
  };

  useEffect(() => {
    setState({ ...state, title: props.title });

    return () => {};
  }, [props]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <div
        className="modal fade"
        id="modelId"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h6 className="modal-title">{props.title}</h6>
              <button
                type="button"
                className="btn close ms-auto"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  hide();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
