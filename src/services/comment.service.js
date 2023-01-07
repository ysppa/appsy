import http from "./../http-common";

class CommentService {
  create(data) {
    return http.post(`/comments`, data);
  }

  delete(id, data = {}) {
    return http.delete(`/comments/${id}`, data);
  }
}

export default new CommentService();
