import React, { useEffect, useState } from "react";
import { Space, User } from "./../models";
import "./SpacePage.css";
import spaceService from "./../services/space.service";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import SpaceAbout from "../components/space.about.component";
import Questions from "../components/questions.component";
import Posts from "../components/posts.component";
import QuestionPage from "./QuestionPage";

export default function SpacePage(props) {
  const [user, setUser] = useState({});
  const [space, setSpace] = useState(new Space());
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname.split("/")[3]);
  const [questionId, setQuestionId] = useState(location.pathname.split("/")[4]);
  const [alert, setAlert] = useState();

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
      .catch((err) => {
        setAlert({ color: "danger", message: err.message });
      });
    return () => {};
  }, []);

  return (
    <>
      <header
        className="CoverPictureCardContainer card border-0 backdrop-blur position-absolute w-100"
        style={{
          backgroundImage: `url(${space.coverPicture})`,
          backgroundSize: `150%`,
        }}
      ></header>
      <div className={`container ${questionId === undefined ? "" : "mt-4"}`}>
        <header>
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
                        backgroundImage: `url(${space.coverPicture})`,
                      }
                    : { backgroundColor: "transparent" }
                }
              >
                <figure
                  className={`LogoContainer bgLogo bg-light rounded ${
                    questionId === undefined ? "position-absolute" : ""
                  }`}
                  style={{ backgroundImage: `url(${space.logo})` }}
                ></figure>
              </div>
              <div className="card-body mt-5 mx-4">
                <h3 className="card-title">{space.name}</h3>
                <div className="card-text">{space.description}</div>
              </div>
            </div>
          </div>
        </header>
        <div className="card-body">
          <section className="row">
            <aside className="col-12 col-lg-9 col-xl-8">
              {questionId === undefined ? (
                <ul className="nav nav-tabs" id="spaceMenuTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <Link
                      to={"about"}
                      className={`nav-link ${tab === "about" ? "active" : ""}`}
                    >
                      About
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
                    <Link
                      to={"posts"}
                      className={`nav-link ${tab === "posts" ? "active" : ""}`}
                    >
                      Posts
                    </Link>
                  </li>
                  <li className="nav-item" role="presentation">
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
                        />
                      }
                    />
                    <Route
                      path="/about"
                      element={<SpaceAbout space={space} />}
                    />
                    <Route path="/posts" element={<Posts space={space} />} />
                    <Route
                      path="*"
                      element={<Questions user={user} space={space} />}
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
