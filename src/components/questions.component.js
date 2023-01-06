import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Space, User } from "./../models";
import questionService from "./../services/question.service";
import Alert from "./alert.component";
import Question from "../models/question.model";
import Avatar from "./avatar.component";
import QuestionComponent from "./question.component";
import { Modal } from "bootstrap";
import AnswerModalComponent from "./answer.modal.component";

export default function Questions(props = {}) {
  const [user, setUser] = useState(new User());
  const [space, setSpace] = useState(new Space());
  const [questions, setQuestions] = useState([
    new Question(),
    new Question(),
    new Question(),
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(new Question());
  const validation = Yup.object({
    title: Yup.string().required(),
  });
  const [alert, setAlert] = useState();
  const [modal, setModal] = useState();

  const reply = (question) => {
    if (question.id === currentQuestion.id) {
      modal.show();
    } else {
      setCurrentQuestion(question);
    }
  };

  useEffect(() => {
    setSpace(new Space(props.space));
    setUser(new User(props.user));

    return () => {};
  }, [props]);

  useEffect(() => {
    if (space.id) {
      questionService
        .index(user.id, space.id)
        .then((res) => {
          const questions = [];
          res.data.questions.map((q) => questions.push(new Question(q)));
          setQuestions(questions);
        })
        .catch((err) => {
          setAlert({ color: "danger", message: err.message });
        });
    }
    return () => {};
  }, [space]);

  useEffect(() => {
    if (currentQuestion.id) {
      setModal(new Modal(".modal", { backdrop: "static" }));
    }

    return () => {};
  }, [currentQuestion]);

  useEffect(() => {
    if (modal) {
      modal.show();
    }

    return () => {};
  }, [modal]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Formik
        initialValues={{ title: "" }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting, setValues }) => {
          setAlert({ color: "info", message: "Posting..." });
          questionService
            .create(user.id, space.id, values)
            .then((res) => {
              const question = new Question(res.data.question);
              setValues({ title: "" });
              setQuestions([question, ...questions]);
              setAlert({ color: "success", message: res.data.message });
            })
            .catch((err) => {
              setAlert({ color: "danger", message: err.message });
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="card mt-4 border">
              <div className="card-body p-2">
                <Alert {...alert} />
                <section className="d-flex align-items-center">
                  <aside className="">
                    <label htmlFor="title" className="form-label m-0">
                      <Avatar user={user} />
                    </label>
                  </aside>
                  <aside className="ms-2 flex-grow-1">
                    <Field
                      name="title"
                      id="title"
                      className="form-control bg-light border-0"
                      placeholder={`Ask in "${space.name}"`}
                    />
                  </aside>
                  <aside className="ms-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Post
                    </button>
                  </aside>
                </section>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ul className="list-group m-0">
        {questions.map((question, key) => (
          <li
            key={key}
            className="list-group-item list-group-item-action rounded border-0 p-0 my-2"
          >
            <QuestionComponent
              space={space}
              question={question}
              answer={reply}
              className=""
            />
          </li>
        ))}
      </ul>
      <AnswerModalComponent
        user={user}
        space={space}
        question={currentQuestion}
        setQuestion={setCurrentQuestion}
        modal={modal}
      />
    </>
  );
}
