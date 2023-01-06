import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Answer, User } from "../models";
import Avatar from "./avatar.component";

export default function AnswerComponent(props = {}) {
  const [answer, setAnswer] = useState(new Answer());
  const [user, setUser] = useState(new User());

  useEffect(() => {
    setAnswer(new Answer(props.answer));

    return () => {};
  }, [props]);

  useEffect(() => {
    setUser(new User(answer.user));

    return () => {};
  }, [answer]);

  return (
    <>
      <div className={`card text-left border ${props.className}`}>
        <div className="card-body pb-0 position-relative">
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
          <p>{answer.content || <Skeleton />}</p>
        </div>
        <div className="card-footer bg-transparent border-0">
          <section className="d-flex justify-content-start">
            <aside>
              {answer.id ? (
                <div className="btn-group rounded-pill overflow-hidden border">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {}}
                  >
                    <span className="bi bi-arrow-up"></span>
                    <span className="ms-2">Upvote</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light border-start"
                    onClick={() => {}}
                  >
                    <span className="bi bi-arrow-down"></span>
                  </button>
                </div>
              ) : (
                <Skeleton
                  className="bg-light rounded-pill"
                  width={75}
                  height={30}
                />
              )}
            </aside>
            <aside className="ms-4">
              {answer.id ? (
                <button type="button" className="btn rounded-pill border">
                  <span className="bi bi-chat-text"></span>
                </button>
              ) : (
                <></>
              )}
            </aside>
          </section>
        </div>
      </div>
    </>
  );
}
