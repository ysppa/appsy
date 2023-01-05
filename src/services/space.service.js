import http from "./../http-common";

class SpaceService {
  getAll(data = {}) {
    return http.get(`/spaces`, data);
  }
  index(userId, data) {
    return http.get(`/spaces/u/${userId}`, data);
  }
  create(userId, data) {
    return http.post(`/spaces/u/${userId}`, data);
  }
}

export default new SpaceService();
