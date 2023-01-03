import http from "./../http-common";
import store from "./storage.service";

class AuthService {
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
}

export default new AuthService();
