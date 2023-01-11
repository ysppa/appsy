import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Answer, User } from "../models";
import Avatar from "./avatar.component";
import "./answer.component.css";

export default function AnswerComponent(props = {}) {
  const [currentUser, setCurrentUser] = useState(new User());
  const [answer, setAnswer] = useState(new Answer());
  const [user, setUser] = useState(new User());

  useEffect(() => {
    setCurrentUser(props.user);
    setAnswer(new Answer(props.answer));

    return () => {};
  }, [props]);

  useEffect(() => {
    setUser(new User(answer.user));

    return () => {};
  }, [answer]);

  return (
    <>
      <div
        className={`AnswerComponent card text-left border ${props.className}`}
      >
        <div className="card-body pb-0 position-relative">
          {answer.id ? (
            <button
              type="button"
              className="position-absolute btn close end-0 top-0"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                // if (window.confirm("Are you sure?")) {
                props.remove(answer);
                // }
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          ) : (
            <></>
          )}
          <h6 className="card-title">
            <section className="d-flex">
              <aside>
                {user.id ? (
                  <Avatar user={user} />
                ) : (
                  <Skeleton circle={true} width={30} height={30} />
                )}
              </aside>
              <aside className="ms-2">
                {user.id ? user.username : <Skeleton width={150} />}
              </aside>
            </section>
          </h6>
          <p className="m-0">{answer.content || <Skeleton />}</p>
        </div>
        <div className="card-footer bg-transparent border-0">
          <section className="d-flex justify-content-start">
            <aside>
              {answer.id ? (
                <div className="btn-group rounded-pill overflow-hidden border">
                  <button
                    type="button"
                    className="btn btn-light btn-static"
                    onClick={() => {
                      answer
                        .upvote(currentUser.id)
                        .then((res) => {
                          answer.votes = res.data.votes;
                          setAnswer(new Answer(answer));
                        })
                        .catch((err) => {
                          props.setAlert({
                            color: "danger",
                            message: err.response.data.message || err.message,
                            show: true,
                          });
                        });
                    }}
                  >
                    {currentUser.upVotedFor(answer) ? (
                      <span className="bi bi-shift-fill"></span>
                    ) : (
                      <span className="bi bi-shift"></span>
                    )}
                    <span className="ms-2">
                      <span>Upvote</span>
                      <span className="bi bi-dot"></span>
                      <span className="">{answer.upVotes().length}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`btn btn-light border-0 border-start btn-static ${
                      currentUser.downVotedFor(answer)
                        ? "bg-danger text-white"
                        : ""
                    }`}
                    onClick={() => {
                      answer
                        .downvote(currentUser.id)
                        .then((res) => {
                          answer.votes = res.data.votes;
                          setAnswer(new Answer(answer));
                        })
                        .catch((err) => {
                          props.setAlert({
                            color: "danger",
                            message: err.response.data.message || err.message,
                            show: true,
                          });
                        });
                    }}
                  >
                    <span className="bi bi-arrow-down"></span>
                  </button>
                </div>
              ) : (
                <Skeleton
                  className="bg-light rounded-pill"
                  width={125}
                  height={35}
                />
              )}
            </aside>
            {/* <aside className="ms-4">
              {answer.id ? (
                <button type="button" className="btn rounded-pill border">
                  <span className="bi bi-chat-text"></span>
                </button>
              ) : (
                <></>
              )}
            </aside> */}
          </section>
        </div>
      </div>
    </>
  );
}
