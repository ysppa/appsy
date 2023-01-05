import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Space, User } from "./../models";
import questionService from "./../services/question.service";
import Alert from "./alert.component";
import Skeleton from "react-loading-skeleton";
import Question from "../models/question.model";
import Avatar from "./avatar.component";

export default function Questions(props = {}) {
  const [user, setUser] = useState(new User());
  const [space, setSpace] = useState(new Space());
  const [questions, setQuestions] = useState([
    new Question(),
    new Question(),
    new Question(),
  ]);
  const validation = Yup.object({
    title: Yup.string().required(),
  });
  const [alert, setAlert] = useState({ color: "info", message: "" });

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
            <div className="card text-left border">
              <div className="card-body pb-0">
                <h5 className="card-title">{question.title || <Skeleton />}</h5>
                <section className="card-text">
                  <span>
                    {question.strAnswers() || <Skeleton className="w-50" />}
                  </span>
                  <span className="text-muted">{question.strPostedAt()}</span>
                </section>
              </div>
              <div className="card-footer bg-transparent border-0">
                <section className="d-flex justify-content-start">
                  <aside>
                    {question.id ? (
                      <button
                        type="button"
                        className="btn btn-light rounded-pill border"
                      >
                        <span className="bi bi-pencil-square"></span>
                        <span className="ms-2">Answer</span>
                      </button>
                    ) : (
                      <Skeleton
                        className="bg-light rounded-pill"
                        width={75}
                        height={30}
                      />
                    )}
                  </aside>
                  <aside className="ms-4">
                    {question.id ? (
                      <button type="button" className="btn rounded-pill">
                        <span className="">Follow</span>
                      </button>
                    ) : (
                      <></>
                    )}
                  </aside>
                  <aside></aside>
                </section>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
