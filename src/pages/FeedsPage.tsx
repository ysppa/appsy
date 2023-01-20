import React, { useEffect, useState } from "react";
import { Post, Question, Space, User } from "../models";
import SpaceForm from "../components/space.form.component";
import spaceService from "../services/space.service";
import Avatar from "../components/avatar.component";
import Alert from "../components/alert.component";
import QuestionFormUI from "../components/question.form.ui";
import AnswerForm from "../components/answer.form.component";
import QuestionComponent from "../components/question.component";
import PostFormUI from "../components/post.form.ui";
import SpaceUI from "../components/space.ui";
import PostUI from "../components/post.ui";
import feedService from "../services/feed.service";

export default function FeedsPage(props: any = {}) {
  const [auth, setAuthState] = useState<any>({});
  const [user, setUser] = useState<User>(new User());
  const [spaces, setSpaces] = useState<Space[]>([
    new Space(),
    new Space(),
    new Space(),
    new Space(),
    new Space(),
    new Space(),
    new Space(),
    new Space(),
    new Space(),
    new Space(),
  ]);
  const [alert, setAlert] = useState<any>();
  const [currentQuestion, setCurrentQuestion] = useState(new Question());
  const [feeds, setFeeds] = useState<any[]>([]);

  const createSpace = () => {
    props.setModalProps({
      title: "Create a Space",
      children: <SpaceForm user={user} modal={props.modal}></SpaceForm>,
    });
    props.modal.show();
  };

  const ask = () => {
    props.setModalProps({
      title: "Add Question",
      children: (
        <QuestionFormUI user={user} modal={props.modal} space={spaces} />
      ),
    });
    props.modal.show();
  };

  const reply = (question: Question) => {
    if (question.id === currentQuestion.id) {
    } else {
      setCurrentQuestion(question);
      props.setModalProps({
        children: (
          <AnswerForm
            user={user}
            question={question}
            setQuestion={setCurrentQuestion}
            modal={props.modal}
          />
        ),
      });
    }
    props.modal.show();
  };

  useEffect(() => {
    setAuthState(props.auth.state);

    return () => {};
  }, [props]);

  useEffect(() => {
    if (auth && auth.user) {
      setUser(auth.user);
    }
  }, [auth]);

  useEffect(() => {
    if (user.id) {
      spaceService
        .getAll({})
        .then((res) => {
          setSpaces(
            res.data.spaces
              .map((s: any) => new Space(s))
              .sort((s: Space) => s.updatedAt)
          );
        })
        .catch((err) => {
          setAlert({ color: "danger", message: err.message, show: true });
        });

      feedService
        .index(null, {})
        .then((res) => {
          let { posts, questions } = res.data;

          posts = posts.map((post: any) => new Post(post));
          questions = questions.map((question: any) => new Question(question));

          setFeeds(posts.concat(questions).sort());
        })
        .catch((err) => {
          setAlert({
            color: "danger",
            message: err.response ? err.response.data.message : err.message,
            show: true,
          });
        });
    }

    return () => {};
  }, [user]);

  useEffect(() => {
    const f = [];

    for (let i = 0; i < 5; i++) {
      f.push(new Question());
      f.push(new Post());
    }

    setFeeds(f);

    return () => {};
  }, []);

  return (
    <>
      <div className="FeedsPage container">
        <section className="row py-4 px-lg-3">
          <aside className="col-12 col-lg-3">
            <button
              type="button"
              onClick={() => {
                createSpace();
              }}
              className="NewSpaceBtn NewBtn btn btn-danger rounded-pill mb-0 mb-lg-4 w-100"
            >
              <span className="d-none d-lg-block">Create space</span>
              <span className="d-block d-lg-none bi bi-plus"></span>
            </button>

            {spaces.length ? (
              <ul className="list-group flex-row flex-lg-column overflow-auto mb-2 mb-lg-0">
                {spaces.map((space, key) => (
                  <li
                    key={key}
                    className="list-group-item list-group-item-action border-0 bg-transparent"
                  >
                    <SpaceUI space={space} />
                  </li>
                ))}
              </ul>
            ) : (
              <></>
            )}
          </aside>
          <aside className="col-12 col-lg-9 col-xl-6 px-0 me-auto">
            <section>
              <div className="card text-left">
                <div className="card-body">
                  <form>
                    <section className="row">
                      <aside className="col-2 col-xl-1">
                        <Avatar user={user} />
                      </aside>
                      <aside className="col-10 col-xl-11">
                        <div
                          onClick={() => {
                            ask();
                          }}
                          className="form-group mb-4"
                        >
                          <input
                            type="text"
                            name="body"
                            disabled
                            placeholder="What do you want to ask or share?"
                            className="form-control bg-light rounded-pill"
                          />
                        </div>
                      </aside>
                      <aside className="col-12">
                        <section className="row">
                          <aside className="col-6">
                            <button
                              type="button"
                              onClick={() => {
                                ask();
                              }}
                              className="btn w-100 d-flex flex-column flex-lg-row justify-content-center align-items-center"
                            >
                              <span className="bi bi-question-octagon"></span>
                              <span className="ms-lg-3">Ask</span>
                            </button>
                          </aside>
                          {/* <aside className="col-4 border-start border-end">
                            <button
                              type="button"
                              className="btn w-100 d-flex flex-column flex-lg-row justify-content-center align-items-center"
                            >
                              <span className="bi bi-pencil-square"></span>
                              <span className="ms-lg-3">Answer</span>
                            </button>
                          </aside> */}
                          <aside className="col-6 border-start">
                            <button
                              type="button"
                              onClick={() => {
                                props.setModalProps({
                                  title: "Create Post",
                                  children: (
                                    <PostFormUI
                                      user={user}
                                      modal={props.modal}
                                      space={spaces}
                                    />
                                  ),
                                });
                                props.modal.show();
                              }}
                              className="btn w-100 d-flex flex-column flex-lg-row justify-content-center align-items-center"
                            >
                              <span className="bi bi-pencil"></span>
                              <span className="ms-lg-3">Post</span>
                            </button>
                          </aside>
                        </section>
                      </aside>
                    </section>
                  </form>
                </div>
              </div>
            </section>
            <Alert {...alert} />
            <ul className="list-group m-0">
              {feeds.map((feed, key) => (
                <li
                  key={key}
                  className="list-group-item list-group-item-action rounded border-0 p-0 my-2"
                >
                  {feed.className === "Question" ? (
                    <QuestionComponent
                      user={user}
                      space={feed.space}
                      question={feed}
                      answer={reply}
                      className=""
                    />
                  ) : (
                    <PostUI
                      user={user}
                      post={feed}
                      answer={reply}
                      setAlert={setAlert}
                      modal={props.modal}
                      setModalProps={props.setModalProps}
                      className=""
                    />
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </div>
    </>
  );
}
