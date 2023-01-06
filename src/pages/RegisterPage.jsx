import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Alert from "../components/alert.component";
import { Link } from "react-router-dom";
import auth from "../services/auth.service";

export default function RegisterPage(props) {
  const [alert, setAlert] = useState();
  const validation = Yup.object({
    username: Yup.string().required(),
    password: Yup.string()
      .required()
      .min(8, "Too short"),
    passwordConfirmation: Yup.string()
      .required()
      .min(8, "Too short"),
  });
  return (
    <>
      <div className="Register">
        <section className="row">
          <aside className="col-lg-5 col-xl-4 mx-auto my-5">
            <Alert {...alert} />
            <h2 className="text-center mb-4">Register</h2>
            <Formik
              initialValues={{
                username: "",
                password: "",
                passwordConfirmation: "",
              }}
              validationSchema={validation}
              onSubmit={(values, { setSubmitting }) => {
                auth
                  .register(values)
                  .then((result) => {
                    setAlert({
                      color: "success",
                      message: result.data.message,
                    });
                  })
                  .catch((err) => {
                    setAlert({
                      color: "danger",
                      message: err.response.data.message,
                    });
                    setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group form-floating mb-3">
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      placeholder="ex: noobMaster69"
                      aria-describedby="usernameHint"
                    />
                    <label htmlFor="username">Username</label>
                    <ErrorMessage
                      name="username"
                      component={"div"}
                      className="small text-danger"
                    />
                  </div>
                  <div className="form-group form-floating mb-3">
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="********"
                      aria-describedby="usernameHint"
                    />
                    <label htmlFor="password">Password</label>
                    <ErrorMessage
                      name="password"
                      component={"div"}
                      className="small text-danger"
                    />
                  </div>
                  <div className="form-group form-floating mb-3">
                    <Field
                      type="password"
                      name="passwordConfirmation"
                      id="passwordConfirmation"
                      className="form-control"
                      placeholder="********"
                      aria-describedby="usernameHint"
                    />
                    <label htmlFor="passwordConfirmation">
                      Password confirmation
                    </label>
                    <ErrorMessage
                      name="passwordConfirmation"
                      component={"div"}
                      className="small text-danger"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-100"
                    >
                      Register
                    </button>
                  </div>
                  <hr />
                  <div className="form-group mb-3">
                    <Link to={"/login"} className="nav-link">
                      <small>Already have an account ?</small>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </aside>
        </section>
      </div>
    </>
  );
}
