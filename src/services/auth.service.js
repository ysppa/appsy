import { setUserSession } from "../Utils/Common";
import { User } from "../models";
import http from "./../http-common";
import store from "./storage.service";

class AuthService {
  update(id, data) {
    return http.put(`/auth/${id}`, data);
  }

  login(data) {
    return http.post("/auth/login", data);
  }

  logout(redirectUri = "/login") {
    store.remove("userData");
    window.location.href = redirectUri;
  }

  register(data) {
    return http.post("/auth/register", data);
  }

  persistLogin(res, authDispatch) {
    const user = res.data.user;
    setUserSession(res.data.token, user);
    authDispatch({
      type: "LOAD_INITIAL_STATE",
      payload: {
        user: new User(user),
        userSignedIn: user !== null && Number(user.id) > 0,
      },
    });
  }

  verifyToken(token) {
    return http.get(`/auth/verifyToken?token=${token}`);
  }
}

export default new AuthService();
