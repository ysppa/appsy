import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Answer, Question } from "../models";
import answerService from "./../services/answer.service";
import Alert from "./alert.component";

export default function AnswerForm(props = {}) {
  const [alert, setAlert] = useState();
  const validation = Yup.object({
    content: Yup.string().required(),
  });

  return (
    <>
      <Formik
        initialValues={{ content: "" }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting, setValues }) => {
          answerService
            .create(props.user.id, props.space.id, props.question.id, values)
            .then((res) => {
              setAlert({
                color: "success",
                message: res.data.message,
                show: true,
              });
              props.question.addAnswer({
                ...res.data.answer,
                user: props.user,
              });
              props.setQuestion(new Question(props.question));
              // props.modal.hide();
              setValues({ content: "" });
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
