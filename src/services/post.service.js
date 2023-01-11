import http from "../http-common";

class PostService {
  index(userId, spaceId, data = {}) {
    return http.get(`/posts/users/${userId}/spaces/${spaceId}`, data);
  }
  create(userId, spaceId, data) {
    return http.post(`/posts/users/${userId}/spaces/${spaceId}`, data);
  }
  get(userId, spaceId, id) {
    return http.get(`/posts/${id}/users/${userId}/spaces/${spaceId}`);
  }
  update(userId, spaceId, id, data) {
    return http.put(`/posts/${id}/users/${userId}/spaces/${spaceId}`, data);
  }
  delete(userId, spaceId, id) {
    return http.delete(`/posts/${id}/users/${userId}/spaces/${spaceId}`);
  }
  upvote(userId, id) {
    return http.post(`/posts/${id}/users/${userId}/votes`, { voteType: 1 });
  }
  downvote(userId, id) {
    return http.post(`/posts/${id}/users/${userId}/votes`, { voteType: -1 });
  }
}

export default new PostService();