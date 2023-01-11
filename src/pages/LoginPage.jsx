import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import auth from "./../services/auth.service";
import Alert from "../components/alert.component";
import { Link } from "react-router-dom";

export default function LoginPage(props) {
  const [alert, setAlert] = useState();

  const validation = Yup.object({
    username: Yup.string()
      .min(2, "Too short")
      .max(150, "Too long")
      .required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .required("Required"),
  });

  return (
    <>
      <div className="Login">
        <section className="row">
          <aside className="col-10 col-lg-5 col-xl-4 mx-auto my-5">
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={validation}
              onSubmit={(values, { setSubmitting }) => {
                setAlert({ color: "info", message: "Logging in..." });

                auth
                  .login(values)
                  .then((res) => {
                    setAlert({
                      color: "success",
                      message: res.data.message,
                      show: true,
                    });
                    auth.persistLogin(res, props.authDispatch);
                    window.location.href = "/";
                  })
                  .catch((err) => {
                    setAlert({
                      color: "danger",
                      message: err.response
                        ? err.response.data.message
                        : err.message,
                      show: true,
                    });
                    setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Alert {...alert} />
                  <h2 className="text-center mb-4">Login</h2>
                  <div className="form-group form-floating mb-3">
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      placeholder="ex: @noobMaster69"
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
                      placeholder="password"
                      aria-describedby="passwordHint"
                    />
                    <label htmlFor="password">Password</label>
                    <ErrorMessage
                      name="password"
                      component={"div"}
                      className="small text-danger"
                    />
                  </div>
                  <div className="form-group form-check mb-3">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      className="form-check-input"
                      placeholder="rememberMe"
                      aria-describedby="rememberMeHint"
                    />
                    <label htmlFor="rememberMe" className="form-check-label">
                      Remember me
                    </label>
                  </div>
                  <div className="form-group mb-3 text-end">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      <span>{isSubmitting ? "Logging in..." : "Log in"}</span>
                    </button>
                  </div>
                  <hr className="" />
                  <div className="form-group mb-3">
                    <Link to={"/register"} className="nav-link">
                      <small>Don't have an account ?</small>
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
