import React, { useEffect, useState } from "react";
import QuestionComponent from "../components/question.component";
import { Question, Space, User } from "../models";
import { Link } from "react-router-dom";
import questionService from "../services/question.service";
import Alert from "../components/alert.component";
import Avatar from "../components/avatar.component";
import { Modal } from "bootstrap";
import AnswerForm from "../components/answer.form.component";
import AnswerComponent from "../components/answer.component";
import answerService from "../services/answer.service";

export default function QuestionPage(props = {}) {
  const [user, setUser] = useState(new User());
  const [space, setSpace] = useState(new Space());
  const [question, setQuestion] = useState(new Question());
  const [alert, setAlert] = useState();
  const reply = () => {
    modal.show();
  };
  const removeAnswer = (answer) => {
    setAlert({ color: "info", message: "Removing...", show: true });
    answerService
      .delete(user.id, space.id, question.id, answer.id)
      .then((res) => {
        setAlert({ color: "success", message: res.data.message, show: true });
        question.removeAnswer(answer.id);
        setQuestion(new Question(question));
      })
      .catch((err) => {
        setAlert({
          color: "danger",
          message: err.response.data.message || err.message,
          show: true,
        });
      });
  };
  const [modal, setModal] = useState();

  useEffect(() => {
    setUser(props.user);
    setSpace(props.space);

    if (props.user.id && props.space.id && props.questionId) {
      questionService
        .get(props.user.id, props.space.id, props.questionId)
        .then((res) => {
          setQuestion(new Question(res.data.question));
        })
        .catch((err) => {
          setAlert({ color: "danger", message: err.message });
        });
    }
    return () => {};
  }, [props]);

  useEffect(() => {
    setModal(new Modal(".modal", { backdrop: "static" }));

    return () => {};
  }, []);

  return (
    <>
      <Link to={`/space/${space.id}/questions`} className="btn mb-3">
        <span className="bi bi-arrow-left"></span>
        <span className="ms-2">Back</span>
      </Link>
      <Alert {...alert} />
      <QuestionComponent
        space={space}
        question={question}
        answer={reply}
        className="mb-2"
      />
      {question.answers.map((a, key) => (
        <AnswerComponent
          key={key}
          user={user}
          space={space}
          question={question}
          answer={a}
          remove={removeAnswer}
          className="mb-2"
        />
      ))}
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
                  modal.hide();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <section className="d-flex">
                <aside>
                  <Avatar user={user} style={{ width: 45, height: 45 }} />
                </aside>
                <aside className="ms-2">
                  <h6>{user.username}</h6>
                </aside>
              </section>
              <h5 className="modal-title my-2">{question.title}</h5>
              <AnswerForm
                user={user}
                space={space}
                question={question}
                setQuestion={setQuestion}
                modal={modal}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
