import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import React, { useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/navbar.component";
import SpacePage from "./pages/SpacePage";
import RegisterPage from "./pages/RegisterPage";
import authReducer from "./reducers/auth.reducer";

function App() {
  const [authState, authDispatch] = useReducer(authReducer, {});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    authDispatch({
      type: "LOAD_INITIAL_STATE",
      payload: {
        user: user,
        userSignedIn: user !== null && Number(user.id) > 0,
      },
    });

    return () => {};
  }, []);

  return (
    <div className="App">
      <Navbar auth={{ state: authState }} />
      <Routes>
        <Route
          path="/space/:slug"
          element={<SpacePage auth={{ state: authState }} />}
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
  );
}

export default App;
