import React, { useEffect, useState } from "react";
import { Space, User } from "../models";
import "./SpacePage.css";
import spaceService from "../services/space.service";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import SpaceAbout from "../components/space.about.component";
import Questions from "../components/questions.component";
import SpaceForm from "../components/space.form.component";
import QuestionPage from "./QuestionPage";
import PostPage from "./PostPage";
import PostsPage from "./PostsPage";
import Alert from "../components/alert.component";
import { handleError } from "../Utils/Common";

export default function SpacePage(props: any = {}) {
  const [user, setUser] = useState<any>({});
  const [space, setSpace] = useState(new Space());
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname.split("/")[3]);
  const [questionId, setQuestionId] = useState(location.pathname.split("/")[4]);
  const [form, setForm] = useState<any>({ logo: "", coverPicture: "" });
  const [alert, setAlert] = useState<any>();

  const updateSpace = () => {
    props.setModalProps({
      title: "Edit Space",
      children: (
        <SpaceForm
          user={user}
          modal={props.modal}
          space={space}
          setSpace={setSpace}
        ></SpaceForm>
      ),
    });
    props.modal.show();
  };

  const handleFileChange = async (e: any) => {
    try {
      const [file] = e.target.files;
      const url = URL.createObjectURL(file);
      form[e.target.name] = url;
      setForm({ ...form });
      const formData = new FormData();
      formData.append(e.target.name, file);
      const res = await (e.target.name === "logo"
        ? space.uploadLogo(formData)
        : space.uploadCoverPicture(formData));
      setSpace(new Space(res.data.space));
    } catch (error) {
      handleError(error, setAlert);
    }
  };

  useEffect(() => {
    if (props.auth.state) {
      setUser(new User(props.auth.state.user));
    }

    return () => {};
  }, [props]);

  useEffect(() => {
    setTab(location.pathname.split("/")[3]);
    setQuestionId(location.pathname.split("/")[4]);

    return () => {};
  }, [location]);

  useEffect(() => {
    const spaceId = Number(location.pathname.split("/")[2]);
    spaceService
      .get(spaceId)
      .then((res) => {
        if (res.data.space) {
          setSpace(new Space(res.data.space));
        }
      })
      .catch((err) => {});

    return () => {};
  }, []);

  return (
    <>
      <header
        className="CoverPictureCardContainer card border-0 backdrop-blur position-absolute w-100"
        style={{
          backgroundImage: `url(${
            form.coverPicture ? form.coverPicture : space.fullCoverPicture()
          })`,
          backgroundSize: `150%`,
        }}
      ></header>
      <div className={`container ${questionId === undefined ? "" : "pt-4"}`}>
        <header className="position-relative">
          <div className="">
            <div
              className={`h-100 pb-5 ${
                questionId === undefined ? "" : "d-flex"
              }`}
            >
              <div
                className={`${
                  questionId === undefined ? "CoverPictureCard" : ""
                } card rounded-0 rounded-bottom border-0`}
                style={
                  questionId === undefined
                    ? {
                        backgroundImage: `url(${
                          form.coverPicture
                            ? form.coverPicture
                            : space.fullCoverPicture()
                        })`,
                      }
                    : { backgroundColor: "transparent" }
                }
              >
                <label
                  role={"button"}
                  htmlFor="coverPicture"
                  title="Change CoverPicture"
                  className="bi bi-camera fs-1 w-100 h-100 d-flex align-items-center justify-content-center btn btn-static bg-opacity-25 rounded-0 w-100"
                ></label>
                <input
                  type={"file"}
                  name="coverPicture"
                  id="coverPicture"
                  onChange={handleFileChange}
                  placeholder="CoverPicture"
                  className="form-control d-none"
                />
                <figure
                  className={`LogoContainer bgLogo bg-light rounded d-flex align-items-end ${
                    questionId === undefined ? "position-absolute" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${
                      form.logo ? form.logo : space.fullLogo()
                    })`,
                  }}
                >
                  {space.userId === user.id ? (
                    <>
                      <label
                        role={"button"}
                        htmlFor="logo"
                        title="Change logo"
                        className="bi bi-camera btn text-white fs-1 d-flex align-items-center justify-content-center btn-static bg-opacity-25 rounded-0 w-100 h-100"
                      ></label>
                      <input
                        type={"file"}
                        name="logo"
                        id="logo"
                        onChange={handleFileChange}
                        placeholder="Logo"
                        className="form-control d-none"
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </figure>
              </div>
              <div className="card-body mt-5 mx-4">
                <h3 className="card-title">{space.name}</h3>
                <div className="card-text">{space.description}</div>
              </div>
            </div>
          </div>
          {space.userId === user.id ? (
            <button
              type="button"
              onClick={() => {
                updateSpace();
              }}
              title="Edit Space btn"
              className="btn btn-link text-white fs-3 bi bi-pencil-square position-absolute top-0 end-0"
            ></button>
          ) : (
            <></>
          )}
        </header>
        <Alert {...alert} />
        <div className="card-body">
          <section className="row">
            <aside className="col-12 col-lg-9 col-xl-8">
              {questionId === undefined ? (
                <ul className="nav nav-tabs" id="spaceMenuTab" role="tablist">
                  <li className="nav-item" role="tab">
                    <Link
                      to={"about"}
                      className={`nav-link ${tab === "about" ? "active" : ""}`}
                    >
                      About
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
                      to={"questions"}
                      className={`nav-link ${
                        !["about", "posts"].includes(tab) ? "active" : ""
                      }`}
                    >
                      Questions
                    </Link>
                  </li>
                </ul>
              ) : (
                <></>
              )}

              <div className="tab-content">
                <div
                  className="tab-pane active"
                  id="questions"
                  role="tabpanel"
                  aria-labelledby="questions-tab"
                >
                  <Routes>
                    <Route
                      path="/questions/:slug"
                      element={
                        <QuestionPage
                          user={user}
                          space={space}
                          questionId={questionId}
                          {...props}
                        />
                      }
                    />
                    <Route
                      path="/about"
                      element={<SpaceAbout space={space} />}
                    />
                    <Route
                      path="/posts/:id"
                      element={<PostPage user={user} space={space} />}
                    />
                    <Route
                      path="/posts"
                      element={
                        <PostsPage
                          user={user}
                          space={space}
                          posts={space.posts}
                        />
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <Questions
                          user={user}
                          space={space}
                          setSpace={setSpace}
                          questions={space.questions}
                          {...props}
                        />
                      }
                    />
                  </Routes>
                </div>
              </div>
            </aside>
            <aside className="col-12 col-lg-3 col-xl-4"></aside>
          </section>
        </div>
      </div>
    </>
  );
}
