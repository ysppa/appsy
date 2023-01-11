import http from "../http-common";

class AnswerService {
  create(userId, spaceId, questionId, data) {
    return http.post(
      `/answers/users/${userId}/spaces/${spaceId}/questions/${questionId}`,
      data
    );
  }
  delete(userId, spaceId, questionId, id, data = {}) {
    return http.delete(
      `/answers/${id}/users/${userId}/spaces/${spaceId}/questions/${questionId}`,
      data
    );
  }
  upvote(userId, id) {
    return http.post(`/answers/${id}/users/${userId}/votes`, { voteType: 1 });
  }
  downvote(userId, id) {
    return http.post(`/answers/${id}/users/${userId}/votes`, { voteType: -1 });
  }
}

export default new AnswerService();
