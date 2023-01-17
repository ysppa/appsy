import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-perfect-scrollbar/dist/css/styles.css";
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
import ProfilePage from "./pages/ProfilePage";
import { Modal } from "bootstrap";
import ModalUI from "./components/modal.ui";
import ChatComponent from "./components/chat.component";
import { getToken, handleError, removeUserSession } from "./Utils/Common";
import authService from "./services/auth.service";
import Alert from "./components/alert.component";

function App() {
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authState, authDispatch] = useReducer(authReducer, {});
  const [modal, setModal] = useState<Modal>();
  const [modalProps, setModalProps] = useState({});
  const [alert, setAlert] = useState<any>({});

  useEffect(() => {
    setAlert({
      color: "info",
      message: "Checking Authentication...",
      show: true,
    });
    const token = getToken();
    if (!token) {
      setAuthLoading(false);
      return;
    }

    authService
      .verifyToken(token)
      .then((res) => {
        authService.persistLogin(res, authDispatch);
        setAuthLoading(false);
      })
      .catch((err) => {
        removeUserSession();
        handleError(err, setAlert);
      });

    if (document.querySelector(".modal")) {
      setModal(new Modal(".modal", { backdrop: true, keyboard: false }));
    }

    return () => {};
  }, []);

  return (
    <div className="App">
      {authLoading ? <Alert {...alert} /> : <></>}
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
            element={
              <RegisterPage
                authDispatch={authDispatch}
                auth={{ state: authState }}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                authDispatch={authDispatch}
                auth={{ state: authState }}
              />
            }
          />
          <Route
            path="*"
            element={
              <HomePage
                setModalProps={setModalProps}
                modal={modal}
                auth={{ state: authState }}
              />
            }
          />
        </Routes>
      </div>
      {authState.userSignedIn ? (
        <ChatComponent setAlert={setAlert} authState={authState} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
