import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import reportService from "../services/report.service";
import { handleError } from "../Utils/Common";

export default function ReportFormUI(props: any = {}) {
  const [initialValues, setInitialValues] = useState<any>();

  useEffect(() => {
    setInitialValues({
      message: "",
      reportableType: props.reportableType,
      reportableId: props.reportableId,
    });

    return () => {};
  }, [props]);

  return (
    <>
      {initialValues ? (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            reportableType: Yup.string().required(),
            reportableId: Yup.number().required(),
            message: Yup.string().required(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              console.log(values);

              const res = await reportService.create(values);
              setSubmitting(false);
            } catch (err) {
              handleError(err, props.setAlert);
            }
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Field type="hidden" name="reportableType" />
              <Field type="hidden" name="reportableId" />
              <div className="form-group mb-4">
                <h6>Let us know what's going on</h6>
                <p>
                  We use your feedback to help us learn when something's not
                  right
                </p>
              </div>
              <div className="form-group mb-4">
                <Field
                  type="radio"
                  name="message"
                  value="harassment"
                  id="harassment"
                  className="d-none"
                />
                <label
                  htmlFor="harassment"
                  className="btn border rounded-pill mb-2"
                >
                  Harassment
                </label>
                <Field
                  type="radio"
                  name="message"
                  value="suicide"
                  id="suicide"
                  className="d-none"
                />
                <label
                  htmlFor="suicide"
                  className="btn border rounded-pill ms-2 mb-2"
                >
                  Suicide or self-injury
                </label>
                <Field
                  type="radio"
                  name="message"
                  value="inappropriate"
                  id="inappropriate"
                  className="d-none"
                />
                <label
                  htmlFor="inappropriate"
                  className="btn border rounded-pill ms-2 mb-2"
                >
                  Sharing inappropriate things
                </label>
                <Field
                  type="radio"
                  name="message"
                  value="hate"
                  id="hate"
                  className="d-none"
                />
                <label
                  htmlFor="hate"
                  className="btn border rounded-pill ms-2 mb-2"
                >
                  Hate speech
                </label>
                <Field
                  type="radio"
                  name="message"
                  value="unauthorized"
                  id="unauthorized"
                  className="d-none"
                />
                <label
                  htmlFor="unauthorized"
                  className="btn border rounded-pill ms-2 mb-2"
                >
                  Unauthorized sales
                </label>
                <Field
                  type="radio"
                  name="message"
                  value="scam"
                  id="scam"
                  className="d-none"
                />
                <label
                  htmlFor="scam"
                  className="btn border rounded-pill ms-2 mb-2"
                >
                  Scams
                </label>
                <Field
                  type="radio"
                  name="message"
                  value="other"
                  id="other"
                  className="d-none"
                />
                <label
                  htmlFor="other"
                  className="btn border rounded-pill ms-2 mb-2"
                >
                  Other
                </label>
              </div>
              <div className="form-group mb-4">
                <p className="text-muted text-center">
                  If someone is in immediate danger, call local emergency
                  services. Don't wait
                </p>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-outline-dark w-100"
                >
                  Send feedback
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <></>
      )}
    </>
  );
}
