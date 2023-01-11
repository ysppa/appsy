import React, { useEffect, useState } from "react";
import { Post, User } from "../models";
import Avatar from "./avatar.component";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function PostUI(props = {}) {
  const [currentUser, setCurrentUser] = useState(new User());
  const [post, setPost] = useState(new Post());
  const [user, setUser] = useState(new User());

  useEffect(() => {
    if (props.user.id) {
      setCurrentUser(props.user);
    }

    if (props.post) {
      setPost(props.post);
    }

    return () => {};
  }, [props]);

  useEffect(() => {
    if (post) {
      setUser(new User(post.user));
    }

    return () => {};
  }, [post]);

  return (
    <>
      <article className={`Post card border ${props.className}`}>
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
              <div className="fw-bolder">
                {user.id ? user.username : <Skeleton width={75} />}
              </div>
              <div className="small">
                {post.id ? (
                  post.createdAt.toLocaleDateString()
                ) : (
                  <Skeleton width={125} />
                )}
              </div>
            </aside>
          </section>
          <p className="card-text mt-2 position-relative">
            {post.id ? post.content : <Skeleton count={3} />}
            {post.id ? (
              <Link
                to={`/space/${post.spaceId}/posts/${post.id}`}
                className="stretched-link"
              ></Link>
            ) : (
              <></>
            )}
          </p>
          {currentUser.upVotedFor(post) ? (
            <div className="small m-0">
              <section className="d-flex">
                <span className="ms-1">{"You upvoted for this"}</span>
              </section>
            </div>
          ) : (
            <></>
          )}
          <section className="d-flex justify-content-start align-items-center">
            <aside>
              {post.id ? (
                <div className="btn-group rounded-pill overflow-hidden border">
                  <button
                    type="button"
                    className="btn btn-light border-0 btn-static"
                    onClick={() => {
                      post
                        .upvote(currentUser.id)
                        .then((res) => {
                          post.votes = res.data.votes;
                          setPost(new Post(post));
                        })
                        .catch((err) => {
                          props.setAlert({
                            color: "danger",
                            message: err.response
                              ? err.response.data.message
                              : err.message,
                            show: true,
                          });
                        });
                    }}
                  >
                    {currentUser.upVotedFor(post) ? (
                      <span className="bi bi-shift-fill"></span>
                    ) : (
                      <span className="bi bi-shift"></span>
                    )}
                    <span className="ms-2">
                      <span>Upvote</span>
                      <span className="bi bi-dot"></span>
                      <span className="">{post.upVotes().length}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`btn btn-light border-0 border-start btn-static ${
                      currentUser.downVotedFor(post)
                        ? "bg-danger text-white"
                        : ""
                    }`}
                    onClick={() => {
                      post
                        .downvote(currentUser.id)
                        .then((res) => {
                          post.votes = res.data.votes;
                          setPost(new Post(post));
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
                    <span className={`bi bi-arrow-down`}></span>
                  </button>
                </div>
              ) : (
                <Skeleton
                  className="bg-light rounded-pill"
                  width={142}
                  height={35}
                />
              )}
            </aside>
            <aside className="ms-4">
              {post.id ? (
                <Link
                  to={`/space/${post.spaceId}/posts/${post.id}`}
                  type="button"
                  className="btn rounded-pill border"
                >
                  <span className="bi bi-chat-text"></span>
                  <span className="bi bi-dot"></span>
                  <span>{post.comments.length}</span>
                </Link>
              ) : (
                <Skeleton
                  width={50}
                  height={35}
                  className="btn rounded-pill border"
                />
              )}
            </aside>
          </section>
        </div>
      </article>
    </>
  );
}
