import React, { useEffect, useState } from "react";
import { User } from "./../models";
import { Modal } from "bootstrap";
import SpaceForm from "../components/space.form.component";
import spaceService from "../services/space.service";
import { Link } from "react-router-dom";
import Avatar from "../components/avatar.component";
import Alert from "../components/alert.component";

export default function FeedsPage(props) {
  const [auth, setAuthState] = useState({});
  const [user, setUser] = useState(new User());
  const [modal, setModal] = useState(undefined);
  const [spaces, setSpaces] = useState([]);
  const [alert, setAlert] = useState();

  useEffect(() => {
    setAuthState(props.auth.state);

    return () => {};
  }, [props]);

  useEffect(() => {
    if (auth && auth.user) {
      setUser(auth.user);
    }
  }, [auth]);

  useEffect(() => {
    if (user) {
      spaceService
        .getAll({})
        .then((res) => {
          setSpaces(res.data.spaces);
        })
        .catch((err) => {
          setAlert({ color: "danger", message: err.message });
        });
    }

    return () => {};
  }, [user]);

  useEffect(() => {
    setModal(new Modal(".modal", { backdrop: "static" }));

    return () => {};
  }, []);

  return (
    <>
      <div className="FeedsPage container">
        <section className="row px-3 py-4">
          <aside className="col-12 col-lg-3">
            <button
              type="button"
              onClick={() => {
                modal.show();
              }}
              className="btn btn-light"
            >
              <span>Create space</span>
            </button>

            {spaces.length ? (
              <ul className="list-group">
                {spaces.map((space, key) => (
                  <li
                    key={key}
                    className="list-group-item list-group-item-action border-0 bg-transparent"
                  >
                    <Link to={`/space/${space.id}`} className="nav-link">
                      {space.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <></>
            )}

            <div
              className="modal fade"
              id="modelId"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <h5 className="modal-title">Create a Space</h5>
                    <button
                      type="button"
                      className="btn close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        modal.hide();
                      }}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <SpaceForm user={user} modal={modal}></SpaceForm>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <aside className="col-12 col-lg-9">
            <section>
              <div className="card text-left">
                <div className="card-body">
                  <form>
                    <section className="row">
                      <aside className="col-2 col-xl-1">
                        <Avatar user={user} />
                      </aside>
                      <aside className="col-10 col-xl-11">
                        <div className="form-group mb-4">
                          <input
                            type="text"
                            name="body"
                            placeholder="What do you want to ask or share?"
                            className="form-control bg-light rounded-pill"
                          />
                        </div>
                      </aside>
                      <aside className="col-12">
                        <section className="row">
                          <aside className="col-4">
                            <button type="button" className="btn w-100">
                              <span className="bi bi-question-octagon"></span>
                              <span className="ms-3">Ask</span>
                            </button>
                          </aside>
                          <aside className="col-4 border-start border-end">
                            <button type="button" className="btn w-100">
                              <span className="bi bi-pencil-square"></span>
                              <span className="ms-3">Answer</span>
                            </button>
                          </aside>
                          <aside className="col-4">
                            <button type="button" className="btn w-100">
                              <span className="bi bi-pencil"></span>
                              <span className="ms-3">Post</span>
                            </button>
                          </aside>
                        </section>
                      </aside>
                    </section>
                  </form>
                </div>
              </div>
            </section>
            <Alert {...alert} />
          </aside>
        </section>
      </div>
    </>
  );
}
