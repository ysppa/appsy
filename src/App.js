import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import React, { useEffect, useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/navbar.component";
import SpacePage from "./pages/SpacePage";
import RegisterPage from "./pages/RegisterPage";
import authReducer from "./reducers/auth.reducer";
import FeedsPage from "./pages/FeedsPage";
import { User } from "./models";
import ProfilePage from "./pages/ProfilePage";
import { Modal } from "bootstrap";
import ModalUI from "./components/modal.ui";

function App() {
  const [authState, authDispatch] = useReducer(authReducer, {});
  const [modal, setModal] = useState();
  const [modalProps, setModalProps] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData")) || {};
    authDispatch({
      type: "LOAD_INITIAL_STATE",
      payload: {
        user: new User(user),
        userSignedIn: user !== null && Number(user.id) > 0,
      },
    });

    setModal(new Modal(".modal", { backdrop: "static", keyboard: false }));

    return () => {};
  }, []);

  return (
    <div className="App">
      <ModalUI modal={modal} {...modalProps}></ModalUI>
      <Navbar
        auth={{ state: authState }}
        modal={modal}
        setModalProps={setModalProps}
      />
      <div id="main">
        <Routes>
          {authState.userSignedIn ? (
            <>
              <Route
                path="/feeds"
                element={
                  <FeedsPage
                    auth={{ state: authState }}
                    modal={modal}
                    setModalProps={setModalProps}
                  />
                }
              />
              <Route
                path="/profile/*"
                element={
                  <ProfilePage
                    auth={{ state: authState }}
                    authDispatch={authDispatch}
                  />
                }
              />
            </>
          ) : (
            <></>
          )}
          <Route
            path="/space/:slug/*"
            element={
              <SpacePage
                auth={{ state: authState }}
                modal={modal}
                setModalProps={setModalProps}
              />
            }
          />
          <Route
            path="/register"
            element={<RegisterPage auth={{ state: authState }} />}
          />
          <Route
            path="/login"
            element={<LoginPage auth={{ state: authState }} />}
          />
          <Route path="*" element={<HomePage auth={{ state: authState }} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
