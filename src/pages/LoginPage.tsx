import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import auth from "../services/auth.service";
import Alert from "../components/alert.component";
import { Link } from "react-router-dom";

export default function LoginPage(props: any = {}) {
  const [alert, setAlert] = useState<any>({});

  const validation = Yup.object({
    username: Yup.string()
      .min(2, "Too short")
      .max(150, "Too long")
      .required("Required"),
    password: Yup.string().min(8, "Too short").required("Required"),
  });

  return (
    <>
      <div
        className="Login"
        style={{
          background: "url('/assets/images/CoverPicture.jpeg') no-repeat",
          backgroundSize: "cover",
        }}
      >
        <section className="row">
          <aside className="col-11 col-lg-8 mx-auto my-5">
            <div className="card">
              <div className="card-body">
                <section className="row">
                  <aside className="col-12 d-flex flex-column align-items-center mb-5">
                    <h1 className="card-title text-primary">Appsy</h1>
                    <h2 className="fs-6 text-center">
                      A place to share your thoughts and feelings
                    </h2>
                  </aside>
                  <aside className="col-12 col-lg-6">
                    <div className="card-body">
                      <p>
                        By continuing, you agree to the{" "}
                        <Link to="/terms-and-conditions">
                          terms and conditions
                        </Link>{" "}
                        and <Link to="/privacy-policy">privacy policy</Link> of
                        Appsy
                      </p>
                      <div className="form-group mb-3">
                        <button
                          type="button"
                          disabled
                          title="Coming soon"
                          className="btn btn-light btn-lg text-start w-100"
                        >
                          <span className="bi bi-google"></span>
                          <span className="ms-2">Continue with Google</span>
                        </button>
                      </div>
                      <div className="form-group mb-3">
                        <button
                          type="button"
                          disabled
                          title="Coming soon"
                          className="btn btn-light btn-lg text-start w-100"
                        >
                          <span className="bi bi-facebook"></span>
                          <span className="ms-2">Continue with Facebook</span>
                        </button>
                      </div>
                      <div className="form-group mb-3">
                        <Link
                          to={"/register"}
                          className="nav-link w-100 text-center"
                        >
                          <small>Register with your e-mail address</small>
                        </Link>
                      </div>
                    </div>
                  </aside>
                  <aside className="col-12 col-lg-6 border-start">
                    <div className="card-body">
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
                            <h3 className="border-bottom pb-2 mb-4">Login</h3>
                            <div className="form-group form-floating mb-3">
                              <Field
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="form-control"
                                placeholder="ex: @noobMaster69"
                                aria-describedby="usernameHint"
                              />
                              <label htmlFor="username">
                                Email or username
                              </label>
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
                                autoComplete="current-password"
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
                            <div className="form-group mb-3 d-flex justify-content-between">
                              <Link
                                to={"/forgot-password"}
                                className="btn text-muted"
                              >
                                Forgot password?
                              </Link>
                              <button
                                disabled={isSubmitting}
                                type="submit"
                                className="btn btn-danger ms-auto rounded-pill"
                              >
                                <span>
                                  {isSubmitting ? "Logging in..." : "Log in"}
                                </span>
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </aside>
                </section>
              </div>
              <div className="form-group border-top d-flex justify-content-center">
                <button
                  type="button"
                  disabled
                  title="Coming soon"
                  className="btn btn-link"
                >
                  <span>English</span>
                  <span className="bi bi-chevron-right"></span>
                </button>
              </div>
              <div className="card-footer text-muted">
                <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="/jobs">
                      Jobs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to="/privacy">
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
}
