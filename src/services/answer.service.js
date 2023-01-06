import http from "../http-common";

class AnswerService {
  create(userId, spaceId, questionId, data) {
    return http.post(
      `/answers/users/${userId}/spaces/${spaceId}/questions/${questionId}`,
      data
    );
  }
}

export default new AnswerService();
