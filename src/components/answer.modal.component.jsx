import React from "react";
import AnswerForm from "./answer.form.component";
import Avatar from "./avatar.component";

export default function AnswerModalComponent(props = {}) {
  return (
    <div
      className="modal fade"
      id="modelId"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn close ms-auto"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                props.modal.hide();
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <section className="d-flex">
              <aside>
                <Avatar user={props.user} style={{ width: 45, height: 45 }} />
              </aside>
              <aside className="ms-2">
                <h6>{props.user.username}</h6>
              </aside>
            </section>
            <h5 className="modal-title my-2">{props.question.title}</h5>
            <AnswerForm
              user={props.user}
              space={props.space}
              question={props.question}
              setQuestion={props.setQuestion}
              modal={props.modal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
