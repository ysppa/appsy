import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import spaceService from "../services/space.service";
import Alert from "./alert.component";
import { useNavigate } from "react-router-dom";
import { Space } from "../models";

export default function SpaceForm(props = {}) {
  const [user, setUser] = useState(props.user);
  const [space, setSpace] = useState(new Space());
  const [modal, setModal] = useState(props.modal);
  const [initialValues, setInitialValues] = useState();
  const validation = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
  });
  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setUser(props.user);
    setModal(props.modal);
    if (props.space && props.space.id) {
      setSpace(props.space);
      setInitialValues({
        name: props.space.name,
        description: props.space.description,
      });
    } else {
      setInitialValues({
        name: `${user.username}'s Space`,
        description: "",
      });
    }

    return () => {};
  }, [props]);

  return (
    <>
      {initialValues ? (
        <div className="SpaceForm">
          <section className="row">
            <aside className="col-12 col-lg-12 mx-auto">
              <Alert {...alert} />
              <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    let res;
                    if (space.id) {
                      res = await space.update(values);
                      props.setSpace(new Space(res.data.space));
                    } else {
                      res = await spaceService.create(user.id, values);
                    }
                    setAlert({
                      color: "success",
                      message: res.data.message,
                      show: true,
                    });
                    modal.hide();
                    setTimeout(() => {
                      navigate(`/space/${res.data.space.id}`);
                    }, 1500);
                  } catch (err) {
                    setAlert({
                      color: "danger",
                      message: err.message,
                      show: true,
                    });
                    setSubmitting(false);
                  }
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
      ) : (
        <></>
      )}
    </>
  );
}
