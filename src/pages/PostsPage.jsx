import React, { useEffect, useState } from "react";
import PostUI from "../components/post.ui";
import Alert from "../components/alert.component";
import { Post } from "../models";
import postService from "../services/post.service";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Avatar from "../components/avatar.component";
import CommentFormUI from "../components/comment.form.ui";
import CommentsComponent from "../components/comments.component";

export default function PostsPage(props = {}) {
  const [posts, setPosts] = useState([new Post(), new Post(), new Post()]);
  const [alert, setAlert] = useState();
  const validation = Yup.object({});

  useEffect(() => {
    if (props.posts) {
      setPosts(props.posts);
    }

    if (props.user && props.user.id && props.space && props.space.id) {
      postService
        .index(props.user.id, props.space.id, {})
        .then((res) => {
          setPosts(res.data.posts.map((post) => new Post(post)));
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
      <Formik
        initialValues={{ content: "" }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting, setValues }) => {
          setAlert({ color: "info", message: "Posting..." });
          postService
            .create(props.user.id, props.space.id, values)
            .then((res) => {
              const post = new Post({ ...res.data.post, user: props.user });
              setValues({ content: "" });
              setPosts([post, ...posts]);
              setAlert({ color: "success", message: res.data.message });
            })
            .catch((err) => {
              setAlert({ color: "danger", message: err.message });
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="card mt-4 border">
              <div className="card-body py-2">
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
                      className="form-control bg-light border-0"
                      placeholder={`Post in "${props.space.name}"`}
                    />
                  </aside>
                  <aside className="ms-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Post
                    </button>
                  </aside>
                </section>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ul className="list-group m-0">
        {posts.map((post, key) => (
          <li
            key={key}
            className="list-group-item list-group-item-action rounded-0 rounded-top border-0 p-0 my-2"
          >
            <PostUI
              user={props.user}
              post={post}
              setAlert={setAlert}
              className="rounded-0 rounded-top border-bottom-0"
            />
            <CommentFormUI
              user={props.user}
              post={post}
              setAlert={setAlert}
              commentAbleType="post"
              commentAbleId={post.id}
            />
            <CommentsComponent
              user={props.user}
              setAlert={setAlert}
              comments={post.comments}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
