import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Alert from "./alert.component";
import * as Yup from "yup";
import postService from "./../services/post.service";
import { Post } from "../models";
import Avatar from "./avatar.component";
import { useNavigate } from "react-router-dom";
import { handleError } from "../Utils/Common";

export default function PostFormUI(props = {}) {
  const [alert, setAlert] = useState();
  const [spaces, setSpaces] = useState([]);
  const validation = Yup.object({
    // spaceId: Yup.number().required(),
    // content: Yup.string().required(),
  });
  const navigate = useNavigate();

  useEffect(() => {
    setSpaces(props.spaces);

    return () => {};
  }, [props]);

  return (
    <>
      <Formik
        initialValues={{ spaceId: "", content: "" }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          postService
            .create(values.spaceId, values)
            .then((res) => {
              setAlert({
                color: "success",
                message: res.data.message,
                show: true,
              });
              const post = new Post(res.data.post);
              props.modal.hide();
              navigate(`/space/${post.spaceId}/posts/${post.id}`);
            })
            .catch((err) => {
              handleError(err, setAlert);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Alert {...alert} />
            <div
              className="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              <ul className="m-0">
                <li>To add a link, paste the URL directly into your post.</li>
                <li>
                  To add a title (
                  <strong>
                    H<sub>1</sub>
                  </strong>
                  ), create a list, access more formatting options, tap{" "}
                  <strong>Aa</strong>
                </li>
              </ul>
            </div>
            <div className="form-group mb-4">
              <section className="d-flex align-items-center">
                <aside>
                  <Avatar user={props.user} />
                </aside>
                <span className="bi bi-chevron-right mx-2"></span>
                <aside className="">
                  <Field
                    name="spaceId"
                    component="select"
                    className="form-control rounded-pill"
                  >
                    <option label="Nowhere" disabled></option>
                    {spaces.map((space, key) => (
                      <option
                        key={key}
                        label={space.name}
                        value={space.id}
                      ></option>
                    ))}
                  </Field>
                </aside>
              </section>
            </div>
            <div className="form-group mb-4">
              <Field
                name="content"
                placeholder={`Write your post...`}
                component="textarea"
                rows={1}
                className="form-control px-0 border-0 border-bottom rounded-0"
              ></Field>
            </div>
            <div className="form-group text-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                <span>{isSubmitting ? "Posting..." : "Post"}</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
