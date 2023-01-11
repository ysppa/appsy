import http from "./../http-common";

class CommentService {
  create(userId, data) {
    return http.post(`/comments/users/${userId}`, data);
  }

  delete(userId, id, data = {}) {
    return http.delete(`/comments/${id}/users/${userId}`, data);
  }

  upvote(userId, id) {
    return http.post(`/comments/${id}/users/${userId}/votes`, { voteType: 1 });
  }

  downvote(userId, id) {
    return http.post(`/comments/${id}/users/${userId}/votes`, { voteType: -1 });
  }
}

export default new CommentService();
