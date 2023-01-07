import React, { useEffect, useState } from "react";
import { Comment, User } from "../models";
import Avatar from "./avatar.component";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function CommentUI(props = {}) {
  const [comment, setComment] = useState(new Comment());
  const [user, setUser] = useState(new User());

  useEffect(() => {
    if (props.comment) {
      setComment(props.comment);
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
      <article className="Comment card border border-bottom-0 rounded-0">
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
                {comment.id ? (
                  comment.createdAt.toLocaleDateString()
                ) : (
                  <Skeleton width={125} />
                )}
              </div>
            </aside>
          </section>
          <p className="card-text mt-2 ms-4 position-relative">
            {comment.id ? comment.content : <Skeleton count={3} />}
            <Link
              to={`/space/${comment.spaceId}/posts/${comment.id}`}
              className="stretched-link"
            ></Link>
          </p>
          <section className="d-flex justify-content-start align-items-center ms-4">
            <aside>
              {comment.id ? (
                <div className="btn-group rounded-pill overflow-hidden border">
                  <button
                    type="button"
                    className="btn btn-light btn-static"
                    onClick={() => {}}
                  >
                    <span className="bi bi-arrow-up"></span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light border-start btn-static"
                    onClick={() => {}}
                  >
                    <span className="bi bi-arrow-down"></span>
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
            <aside className="ms-4">
              {comment.id ? (
                <button type="button" className="btn rounded-pill border">
                  <span className="">Reply</span>
                </button>
              ) : (
                <Skeleton width={50} height={22} className="" />
              )}
            </aside>
          </section>
        </div>
      </article>
    </>
  );
}
