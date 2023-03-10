import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { User } from "../models";
import Avatar from "../components/avatar.component";
import Profile from "../components/profile.component";
import Alert from "../components/alert.component";
import authService from "../services/auth.service";
import storageService from "../services/storage.service";
import { Link, Route, Routes, useLocation } from "react-router-dom";

export default function ProfilePage(props: any = {}) {
  const [authState, setAuthState] = useState({ user: null });
  const [user, setUser] = useState(new User());
  const validation = Yup.object({});
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname.split("/")[2]);
  const [alert, setAlert] = useState<any>({});
  const handleFileChange = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    setTab(location.pathname.split("/")[2]);

    return () => {};
  }, [location]);

  useEffect(() => {
    setAuthState(props.auth.state);
    return () => {};
  }, [props]);

  useEffect(() => {
    if (authState && authState.user) {
      setUser(authState.user);
    }
  }, [authState]);

  return (
    <>
      <div className="ProfilePage container py-5 p-lg-5">
        <section className="row">
          <aside className="col-12 col-lg-8">
            {user.id ? (
              <>
                <Formik
                  initialValues={{
                    avatar: "",
                    username: user.username,
                    email: user.email,
                  }}
                  validationSchema={validation}
                  onSubmit={(values, { setSubmitting }) => {
                    setAlert({
                      color: "info",
                      message: "Updating...",
                      show: true,
                    });
                    authService
                      .update(user.id, values)
                      .then((res) => {
                        const userData = res.data.user;
                        storageService.set("userData", userData);
                        props.authDispatch({
                          type: "LOAD_INITIAL_STATE",
                          payload: {
                            user: new User(userData),
                            userSignedIn: true,
                          },
                        });
                        setAlert({
                          color: "success",
                          message: res.data.message,
                          show: true,
                        });
                      })
                      .catch((err) => {
                        setAlert({
                          color: "danger",
                          message: err.response.data.message || err.message,
                          show: true,
                        });
                      })
                      .finally(() => {
                        setSubmitting(false);
                      });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Alert {...alert} />
                      <section className="row">
                        <aside className="col-4 col-lg-2">
                          <label htmlFor="avatar" role={"button"}>
                            <Avatar
                              user={user}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <Field
                              type="file"
                              name="avatar"
                              id="avatar"
                              onChange={handleFileChange}
                              className="form-control d-none"
                            />
                          </label>
                        </aside>
                        <aside className="col-8 col-lg-8">
                          <Field
                            name="username"
                            id="username"
                            className="form-control fs-5 fw-bold bg-transparent border-0"
                          />
                        </aside>
                        <aside className="col-12 col-lg-2 text-end">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary"
                          >
                            Save
                          </button>
                        </aside>
                        <aside className="col-12 col-lg-12">
                          <label htmlFor="headline">
                            Write a description about yourself
                          </label>
                          <Field
                            component="textarea"
                            name="headline"
                            id="headline"
                            className="form-control"
                          ></Field>
                        </aside>
                      </section>
                    </Form>
                  )}
                </Formik>
                <ul
                  className="nav nav-tabs nav-fill"
                  id="spaceMenuTab"
                  aria-controls="tabs"
                  role="tablist"
                >
                  <li className="nav-item" role="tab">
                    <Link
                      to={""}
                      className={`nav-link ${
                        tab === undefined ? "active" : ""
                      }`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item" role="tab">
                    <Link
                      to={"answers"}
                      className={`nav-link ${
                        tab === "answers" ? "active" : ""
                      }`}
                    >
                      Answers
                    </Link>
                  </li>
                  <li className="nav-item" role="tab">
                    <Link
                      to={"questions"}
                      className={`nav-link ${
                        tab === "questions" ? "active" : ""
                      }`}
                    >
                      Questions
                    </Link>
                  </li>
                  <li className="nav-item" role="tab">
                    <Link
                      to={"posts"}
                      className={`nav-link ${tab === "posts" ? "active" : ""}`}
                    >
                      Posts
                    </Link>
                  </li>
                  <li className="nav-item" role="tab">
                    <Link
                      to={"followers"}
                      className={`nav-link ${
                        tab === "followers" ? "active" : ""
                      }`}
                    >
                      Followers
                    </Link>
                  </li>
                  <li className="nav-item" role="tab">
                    <Link
                      to={"following"}
                      className={`nav-link ${
                        tab === "following" ? "active" : ""
                      }`}
                    >
                      Following
                    </Link>
                  </li>
                  <li className="nav-item" role="tab">
                    <Link
                      to={"edits"}
                      className={`nav-link ${tab === "edits" ? "active" : ""}`}
                    >
                      Edits
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link
                      to={"activity"}
                      className={`nav-link ${
                        tab === "activity" ? "active" : ""
                      }`}
                    >
                      Activity
                    </Link>
                  </li>
                </ul>

                <div className="tab-content">
                  <div
                    className="tab-pane active"
                    id="questions"
                    role="tabpanel"
                    aria-labelledby="questions-tab"
                  >
                    <Routes>
                      <Route path="*" element={<Profile user={user} />} />
                    </Routes>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </aside>
          <aside className="col-12 col-lg-4"></aside>
        </section>
      </div>
    </>
  );
}
