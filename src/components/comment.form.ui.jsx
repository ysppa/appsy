import React, { useEffect, useState } from "react";
import commentService from "../services/comment.service";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Avatar from "../components/avatar.component";
import { Post } from "../models";
import { useNavigate } from "react-router-dom";

export default function CommentFormUI(props = {}) {
  const [post, setPost] = useState(new Post());
  const [initialValues, setInitialValues] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setPost(props.post);
    if (props.commentAbleId && props.commentAbleType) {
      setInitialValues({
        content: "",
        commentAbleId: props.commentAbleId,
        commentAbleType: props.commentAbleType,
      });
    }

    return () => {};
  }, [props]);

  return initialValues ? (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        commentAbleId: Yup.number().required(),
        commentAbleType: Yup.string().required(),
        content: Yup.string().required(),
      })}
      onSubmit={(values, { setSubmitting, setValues }) => {
        commentService
          .create(values)
          .then((res) => {
            setValues(initialValues);
            post.addComment({
              ...res.data.comment,
              user: props.user,
              post: post,
            });
            if (props.setPost) {
              props.setPost(new Post(post));
            } else {
              setPost(new Post(post));
              navigate(`/space/${post.spaceId}/posts/${post.id}`);
            }
          })
          .catch((err) => {
            props.setAlert({
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
          <Field type="hidden" name="commentAbleId" />
          <Field type="hidden" name="commentAbleType" />
          <div className="card border-0 border-start border-end bg-light rounded-0">
            <div className="card-body py-2">
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
                    className="btn btn-primary rounded-pill d-flex flex-row"
                  >
                    <span>Add</span>
                    <span className="d-none d-lg-block ms-1">comment</span>
                  </button>
                </aside>
              </section>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  ) : (
    <></>
  );
}
