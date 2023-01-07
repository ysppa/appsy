import React, { useEffect, useState } from "react";
import PostUI from "../components/post.ui";
import { Link, useLocation } from "react-router-dom";
import { Post } from "../models";
import postService from "../services/post.service";
import commentService from "../services/comment.service";
import Alert from "../components/alert.component";
import CommentsComponent from "../components/comments.component";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Avatar from "../components/avatar.component";

export default function PostPage(props = {}) {
  const [post, setPost] = useState(new Post());
  const location = useLocation();
  const [alert, setAlert] = useState();

  useEffect(() => {
    if (props.post) {
      setPost(props.post);
    }

    if (props.user && props.user.id && props.space && props.space.id) {
      postService
        .get(
          props.user.id,
          props.space.id,
          Number(location.pathname.split("/")[4])
        )
        .then((res) => {
          setPost(new Post(res.data.post));
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
  }, [props]);

  return (
    <>
      <Link to={`/space/${props.space.id}/posts`} className="btn mb-3">
        <span className="bi bi-arrow-left"></span>
        <span className="ms-2">Back</span>
      </Link>
      <Alert {...alert} />
      <PostUI
        user={props.user}
        space={props.space}
        post={post}
        className="rounded-0 rounded-top border-bottom-0"
      />
      <Formik
        initialValues={{ content: "" }}
        validationSchema={Yup.object({
          content: Yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting, setValues }) => {
          commentService
            .create(values)
            .then((res) => {
              post.addComment({
                ...res.data.comment,
                user: props.user,
                post: post,
              });
              setPost(new Post(post));
              setValues({ content: "" });
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
            <div className="card border-0 border-start border-end bg-light rounded-0">
              <div className="card-body p-2">
                <Alert {...alert} />
                <section className="d-flex align-items-center">
                  <aside className="">
                    <label htmlFor="content" className="form-label m-0">
                      <Avatar user={props.user} />
                    </label>
                  </aside>
                  <aside className="ms-2 flex-grow-1">
                    <Field
                      name="content"
                      id="content"
                      className="form-control rounded-pill border-0"
                      placeholder={`Add a comment`}
                    />
                  </aside>
                  <aside className="ms-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary rounded-pill"
                    >
                      Add <span className="d-none d-lg-block">comment</span>
                    </button>
                  </aside>
                </section>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <CommentsComponent comments={post.comments} />
    </>
  );
}
