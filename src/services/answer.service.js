import http from "../http-common";

class AnswerService {
  create(questionId, data) {
    return http.post(`/answers?questionId=${questionId}`, data);
  }
  delete(questionId, id, data = {}) {
    return http.delete(`/answers/${id}?questionId=${questionId}`, data);
  }
  upvote(id) {
    return http.post(`/answers/${id}/votes`, { voteType: 1 });
  }
  downvote(id) {
    return http.post(`/answers/${id}/votes`, { voteType: -1 });
  }
}

export default new AnswerService();
