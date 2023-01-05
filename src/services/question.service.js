import http from "./../http-common";

class QuestionService {
  index(userId, spaceId, data = {}) {
    return http.get(`/questions/users/${userId}/spaces/${spaceId}`, data);
  }
  create(userId, spaceId, data) {
    return http.post(`/questions/users/${userId}/spaces/${spaceId}`, data);
  }
  get(userId, spaceId, id) {
    return http.get(`/questions/${id}/users/${userId}/spaces/${spaceId}`);
  }
  update(userId, spaceId, id, data) {
    return http.put(`/questions/${id}/users/${userId}/spaces/${spaceId}`, data);
  }
  delete(userId, spaceId, id) {
    return http.delete(`/questions/${id}/users/${userId}/spaces/${spaceId}`);
  }
}

export default new QuestionService();
