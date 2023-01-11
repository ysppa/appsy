import React, { useEffect, useState } from "react";
import { Comment, User } from "../models";
import Avatar from "./avatar.component";
import Skeleton from "react-loading-skeleton";

export default function CommentUI(props = {}) {
  const [currentUser, setCurrentUser] = useState(new User());
  const [comment, setComment] = useState(new Comment());
  const [user, setUser] = useState(new User());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (props.user) {
      setCurrentUser(props.user);
    }
    if (props.comment) {
      setComment(new Comment(props.comment));
    }

    return () => {};
  }, [props]);

  useEffect(() => {
    if (comment) {
      setUser(new User(comment.user));
    }

    return () => {};
  }, [comment]);

  return (
    <>
      <article className="Comment card border border-top-0 border-bottom-0 rounded-0">
        <div className="card-body">
          <section className="d-flex">
            <aside className="">
              {user.id ? (
                <Avatar user={user} />
              ) : (
                <Skeleton circle={true} width={32} height={32} />
              )}
            </aside>
            <aside className="ms-2">
              <article>
                <div className="fw-bolder">
                  {user.id ? user.username : <Skeleton width={75} />}
                </div>
                <div className="small">
                  {comment.id ? (
                    comment.createdAt.toLocaleDateString()
                  ) : (
                    <Skeleton width={125} />
                  )}
                </div>
              </article>
              <p className="card-text mt-2 position-relative">
                {comment.id ? comment.content : <Skeleton count={3} />}
              </p>
              <section className="d-flex justify-content-start align-items-center">
                <aside>
                  {comment.id ? (
                    <div className="btn-group rounded-pill overflow-hidden border">
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className="btn btn-light border-0 btn-static"
                        onClick={() => {
                          setIsSubmitting(true);
                          comment
                            .upvote(currentUser.id)
                            .then((res) => {
                              comment.votes = res.data.votes;
                              setComment(new Comment(comment));
                            })
                            .catch((err) => {
                              props.setAlert({
                                color: "danger",
                                message:
                                  err.response.data.message || err.message,
                                show: true,
                              });
                            })
                            .finally(() => {
                              setIsSubmitting(false);
                            });
                        }}
                      >
                        {currentUser.upVotedFor(comment) ? (
                          <span className="bi bi-shift-fill"></span>
                        ) : (
                          <span className="bi bi-shift"></span>
                        )}
                        <span className="bi bi-dot"></span>
                        <span className="">{comment.upVotes().length}</span>
                      </button>
                      <button
                        type="button"
                        disabled={isSubmitting}
                        className={`btn btn-light border-0 border-start btn-static ${
                          currentUser.downVotedFor(comment)
                            ? "bg-danger text-white"
                            : ""
                        }`}
                        onClick={() => {
                          setIsSubmitting(true);
                          comment
                            .downvote(currentUser.id)
                            .then((res) => {
                              comment.votes = res.data.votes;
                              setComment(new Comment(comment));
                            })
                            .catch((err) => {
                              props.setAlert({
                                color: "danger",
                                message:
                                  err.response.data.message || err.message,
                                show: true,
                              });
                            })
                            .finally(() => {
                              setIsSubmitting(false);
                            });
                        }}
                      >
                        <span className={`bi bi-arrow-down`}></span>
                      </button>
                    </div>
                  ) : (
                    <Skeleton
                      className="bg-light rounded-pill"
                      width={75}
                      height={35}
                    />
                  )}
                </aside>
                {/* <aside className="ms-4">
              {comment.id ? (
                <button type="button" className="btn rounded-pill border">
                  <span className="">Reply</span>
                </button>
              ) : (
                <Skeleton width={50} height={22} className="" />
              )}
            </aside> */}
              </section>
            </aside>
          </section>
        </div>
      </article>
    </>
  );
}
