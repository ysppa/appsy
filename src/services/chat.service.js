import http from "../http-common";
// import store from "./storage.service";

class ChatService {
  index(data = {}) {
    return http.get(`/chat`, data);
  }
}

export default new ChatService();
