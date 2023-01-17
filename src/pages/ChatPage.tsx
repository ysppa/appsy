import React, { useEffect, useState } from "react";
import Avatar from "../components/avatar.component";
import Skeleton from "react-loading-skeleton";
import GroupComponent from "../components/group.component";
import PerfectScrollbar from "react-perfect-scrollbar";
import { User } from "../models";

export default function ChatPage(props: any = {}) {
  const [state, setState] = useState({
    users: [],
    groups: [],
  });

  useEffect(() => {
    setState({ ...state, users: props.users, groups: props.groups });

    return () => {};
  }, [props]);

  return (
    <>
      <article
        data-mdb-perfect-scrollbar="true"
        id="ChatPage"
        className="ChatPage card border-0 rounded-0 bg-transparent h-100 overflow-auto"
      >
        <PerfectScrollbar>
          <header className="card-header bg-dark border-0 sticky-top px-1">
            <section className="d-flex justify-content-between align-items-center">
              <aside className="d-flex align-items-center">
                <button
                  type="button"
                  title="Menu"
                  className="btn btn-icon bi bi-list me-3"
                ></button>
                <h6 className="chat-title m-0">Chats</h6>
              </aside>
              <aside>
                <button
                  type="button"
                  title="Photos"
                  className="btn btn-icon bi bi-camera-fill me-3"
                ></button>
                <button
                  type="button"
                  title="Edit"
                  className="btn btn-icon bi bi-pencil-fill"
                ></button>
              </aside>
            </section>
          </header>
          <div className="card-body pt-2 px-1">
            <form>
              <div className="ChatSearchForm form-group d-flex align-items-center px-3">
                <span className="bi bi-search"></span>
                <input
                  type={"search"}
                  name="q"
                  placeholder="Search"
                  autoComplete="false"
                  className="form-control border-0 bg-transparent"
                />
              </div>
            </form>
            <article
              style={{ height: "max-content" }}
              id="GroupsList"
              className="overflow-auto p-0 m-0"
            >
              <PerfectScrollbar>
                <div style={{ width: "max-content" }}>
                  {state.users.map((user: User, key) => (
                    <button
                      key={key}
                      type="button"
                      className="btn bg-transparent"
                    >
                      <figure className="d-flex flex-column align-items-center m-0">
                        <Avatar user={user} width={50} height={50} />
                        <div className="username mt-1">
                          {user.id ? (
                            <span className="text-white">{user.username}</span>
                          ) : (
                            <Skeleton
                              width={50}
                              height={10}
                              className="rounded-pill"
                            />
                          )}
                        </div>
                      </figure>
                    </button>
                  ))}
                </div>
              </PerfectScrollbar>
              <div className="">
                <ul className="list-group rounded-0">
                  {state.groups.map((group, key) => (
                    <GroupComponent key={key} group={group} />
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </PerfectScrollbar>
      </article>
    </>
  );
}
