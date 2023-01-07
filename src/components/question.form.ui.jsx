import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Avatar from "./avatar.component";
import Alert from "./alert.component";
import questionService from "../services/question.service";
import spaceService from "../services/space.service";
import { Question, Space } from "./../models";
import { useNavigate } from "react-router-dom";

export default function QuestionFormUI(props = {}) {
  const [spaces, setSpaces] = useState([]);
  const [alert, setAlert] = useState();
  const validation = Yup.object({
    spaceId: Yup.number().required(),
    title: Yup.string().required(),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (props.spaces && props.spaces.length) {
      setSpaces(props.spaces);
    }

    return () => {};
  }, [props]);

  useEffect(() => {
    spaceService
      .getAll()
      .then((res) => {
        setSpaces(res.data.spaces.map((space) => new Space(space)));
      })
      .catch((err) => {
        setAlert({
          color: "danger",
          message: err.response.data.message || err.message,
          show: true,
        });
      });

    return () => {};
  }, []);

  return (
    <>
      <Formik
        initialValues={{ spaceId: "", title: "" }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          questionService
            .create(props.user.id, values.spaceId, values)
            .then((res) => {
              setAlert({
                color: "success",
                message: res.data.message,
                show: true,
              });
              const question = new Question(res.data.question);
              navigate(`/space/${question.spaceId}/questions/${question.id}`);
              props.modal.hide();
            })
            .catch((err) => {
              setAlert({
                color: "danger",
                message: err.response.data.message || err.message,
                show: true,
              });
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Alert {...alert} />
            <div
              className="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              <div className="fw-bolder">
                Tips on getting good answers quickly
              </div>
              <ul className="m-0">
                <li>Make sure your question has not been asked already</li>
                <li>Keep your question short and to the point</li>
                <li>Double-check grammar and spelling</li>
              </ul>
            </div>
            <div className="form-group mb-4">
              <section className="d-flex align-items-center">
                <aside>
                  <Avatar user={props.user} />
                </aside>
                <span className="bi bi-chevron-right mx-2"></span>
                <aside className="">
                  <Field
                    name="spaceId"
                    component="select"
                    className="form-control rounded-pill"
                  >
                    <option label="Nowhere" disabled></option>
                    {spaces.map((space, key) => (
                      <option
                        key={key}
                        label={space.name}
                        value={space.id}
                      ></option>
                    ))}
                  </Field>
                </aside>
              </section>
            </div>
            <div className="form-group mb-4">
              <Field
                name="title"
                placeholder={`Start your question with "What", "How", "Why", etc.`}
                component="textarea"
                rows={1}
                className="form-control px-0 border-0 border-bottom rounded-0"
              ></Field>
            </div>
            <div className="form-group text-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                <span>{isSubmitting ? "Posting..." : "Post"}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
