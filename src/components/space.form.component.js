import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import spaceService from "../services/space.service";
import Alert from "./alert.component";
import { useNavigate } from "react-router-dom";

export default function SpaceForm(props = {}) {
  const [user, setUser] = useState(props.user);
  const [modal, setModal] = useState(props.modal);
  const validation = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
  });
  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(props.user);
    setModal(props.modal);

    return () => {};
  }, [props]);

  return (
    <>
      <div className="SpaceForm">
        <section className="row">
          <aside className="col-12 col-lg-12 mx-auto">
            <Alert color={alert.color} message={alert.message} />
            <Formik
              initialValues={{
                name: `${user.username}'s Space`,
                description: "",
              }}
              validationSchema={validation}
              onSubmit={(values, { setSubmitting }) => {
                spaceService
                  .create(user.id, values)
                  .then((res) => {
                    modal.hide();
                    setAlert({ color: "success", message: res.data.message });
                    setTimeout(() => {
                      navigate(`/space/${res.data.space.id}`);
                    }, 1500);
                  })
                  .catch((err) => {
                    setAlert({ color: "danger", message: err.message });
                    setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-group mb-4">
                    <label htmlFor="name">Name</label>
                    <div className="small text-muted my-1">
                      This can be changed in Space settings
                    </div>
                    <Field
                      name="name"
                      id="name"
                      placeholder={`${user.username}'s Space`}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="description">Brief description</label>
                    <div className="small text-muted my-1">
                      Include a few keywords to show people what to expect if
                      they join
                    </div>
                    <Field
                      name="description"
                      id="description"
                      placeholder=""
                      className="form-control"
                    />
                  </div>
                  <div className="form-group text-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting ? "Posting..." : "Post"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </aside>
        </section>
      </div>
    </>
  );
}
