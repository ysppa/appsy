import http from "./../http-common";

class SpaceService {
  get(spaceId, data = {}) {
    return http.get(`/spaces/${spaceId}`, data);
  }
  update(spaceId, data = {}) {
    return http.put(`/spaces/${spaceId}`, data);
  }
  upload(spaceId, file, data = {}) {
    return http.put(`/spaces/${spaceId}/upload/${file}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  getAll(data = {}) {
    return http.get(`/spaces`, data);
  }
  index(userId, data) {
    return http.get(`/spaces/u/${userId}`, data);
  }
  create(userId, data) {
    return http.post(`/spaces/u/${userId}`, data);
  }
  follow(id) {
    return http.put(`/spaces/${id}/follow`);
  }
}

export default new SpaceService();
