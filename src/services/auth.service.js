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
}

export default new AuthService();
