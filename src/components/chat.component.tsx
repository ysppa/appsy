import React, { useEffect, useState } from "react";
import "./chat.component.css";
import { Link } from "react-router-dom";
import { Group, User } from "../models";
import ChatPage from "../pages/ChatPage";
import chatService from "../services/chat.service";

export default function ChatComponent(props: any = {}) {
  const [currentUser, setCurrentUser] = useState(new User());
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("chat");
  const [users] = useState([
    new User(),
    new User(),
    new User(),
    new User(),
    new User(),
    new User(),
    new User(),
    new User(),
    new User(),
    new User(),
    new User(),
    new User(),
  ]);
  const [groups] = useState([
    new Group(),
    new Group(),
    new Group(),
    new Group(),
    new Group(),
    new Group(),
    new Group(),
    new Group(),
    new Group(),
    new Group(),
  ]);

  useEffect(() => {
    setCurrentUser(new User(props.authState.user));

    return () => {};
  }, [props]);

  useEffect(() => {
    chatService
      .index()
      .then((res) => {})
      .catch((err) => {
        props.setAlert({
          color: "danger",
          message: err.response.data.message || err.message,
          show: true,
        });
      });

    return () => {};
  }, []);

  return (
    <>
      <article
        className={`ChatCard ${
          isExpanded ? "Expanded" : ""
        } card border-0 shadow-lg rounded-0 rounded-top bg-dark`}
      >
        <header
          role={"button"}
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
          className="card-header btn-static bg-primary d-flex justify-content-between"
        >
          <h6 className="card-title">Messages</h6>
          <button
            type="button"
            title="Toggle Chat btn"
            className="ExpandBtn bi bi-chevron-up bg-transparent border-0 px-2 ms-5"
          ></button>
        </header>
        <>
          <div className="ChatCardBody card-body text-white p-0">
            {tab === "chat" ? (
              <ChatPage
                groups={groups}
                users={users}
                currentUser={currentUser}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="ChatCardFooter card-footer p-0">
            <section className="">
              <ul className="nav nav-tabs nav-fill p-0">
                <li className="nav-item">
                  <Link
                    to="chat"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("chat");
                    }}
                    className={`nav-link d-flex flex-column align-items-center ${
                      tab === "chat" ? "active text-primary" : "text-muted"
                    }`}
                  >
                    <span className="bi bi-chat-fill"></span>
                    <span>Chat</span>
                  </Link>
                </li>
                {/* <li className="nav-item">
                    <Link
                      to="calls"
                      className="nav-link d-flex flex-column align-items-center disabled"
                    >
                      <span className="bi bi-camera-video"></span>
                      <span>Calls</span>
                    </Link>
                  </li> */}
                <li className="nav-item">
                  <Link
                    to="people"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("people");
                    }}
                    className={`nav-link d-flex flex-column align-items-center ${
                      tab === "people" ? "active text-primary" : "text-muted"
                    }`}
                  >
                    <span className="bi bi-people-fill"></span>
                    <span>People</span>
                  </Link>
                </li>
                {/* <li className="nav-item">
                    <Link
                      to="stories"
                      className="nav-link d-flex flex-column align-items-center disabled"
                    >
                      <span className="bi bi-card-image"></span>
                      <span>Stories</span>
                    </Link>
                  </li> */}
                <li className="nav-item">
                  <Link
                    to="settings"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab("settings");
                    }}
                    className={`nav-link d-flex flex-column align-items-center ${
                      tab === "settings" ? "active text-primary" : "text-muted"
                    }`}
                  >
                    <span className="bi bi-menu-button-fill"></span>
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </>
      </article>
    </>
  );
}
