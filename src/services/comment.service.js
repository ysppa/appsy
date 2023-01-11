import http from "./../http-common";

class CommentService {
  create(data) {
    return http.post(`/comments`, data);
  }

  delete(id, data = {}) {
    return http.delete(`/comments/${id}`, data);
  }

  upvote(id) {
    return http.post(`/comments/${id}/votes`, { voteType: 1 });
  }

  downvote(id) {
    return http.post(`/comments/${id}/votes`, { voteType: -1 });
  }
}

export default new CommentService();
