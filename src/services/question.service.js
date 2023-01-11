import http from "./../http-common";

class QuestionService {
  index(spaceId, data = {}) {
    return http.get(`/questions?spaceId=${spaceId}`, data);
  }
  create(spaceId, data) {
    return http.post(`/questions?spaceId=${spaceId}`, data);
  }
  get(spaceId, id) {
    return http.get(`/questions/${id}?spaceId=${spaceId}`);
  }
  update(spaceId, id, data) {
    return http.put(`/questions/${id}?spaceId=${spaceId}`, data);
  }
  delete(spaceId, id) {
    return http.delete(`/questions/${id}?spaceId=${spaceId}`);
  }
}

export default new QuestionService();
