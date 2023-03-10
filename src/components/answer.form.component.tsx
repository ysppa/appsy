import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Question } from "../models";
import answerService from "../services/answer.service";
import Alert from "./alert.component";
import Avatar from "./avatar.component";
import { useNavigate } from "react-router-dom";

export default function AnswerForm(props: any = {}) {
  const [alert, setAlert] = useState<any>();
  const validation = Yup.object({
    content: Yup.string().required(),
  });
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{ content: "" }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting, setValues }) => {
          answerService
            .create(props.question.id, values)
            .then((res) => {
              props.question.addAnswer({
                ...res.data.answer,
                user: props.user,
              });
              props.setQuestion(new Question(props.question));
              setValues({ content: "" });
              navigate(
                `/space/${props.question.spaceId}/questions/${props.question.id}`
              );
              props.modal.hide();
            })
            .catch((err) => {
              setAlert({ color: "danger", message: err.message, show: true });
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Alert {...alert} />
            <section className="d-flex">
              <aside>
                <Avatar user={props.user} style={{ width: 45, height: 45 }} />
              </aside>
              <aside className="ms-2">
                <h6>{props.user.username}</h6>
              </aside>
            </section>
            <h5 className="card-title my-2">{props.question.title}</h5>
            <div className="form-group mb-4">
              <Field
                component="textarea"
                name="content"
                placeholder="Write your answer"
                className="form-control border-0 px-0"
                autoFocus
                rows={4}
              ></Field>
            </div>
            <div className="form-group text-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                Post
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
