import http from "../http-common";

class PostService {
  index(spaceId, data = {}) {
    return http.get(`/posts?spaceId=${spaceId}`, data);
  }
  create(spaceId, data) {
    return http.post(`/posts?spaceId=${spaceId}`, data);
  }
  get(spaceId, id) {
    return http.get(`/posts/${id}?spaceId=${spaceId}`);
  }
  update(spaceId, id, data) {
    return http.put(`/posts/${id}?spaceId=${spaceId}`, data);
  }
  delete(spaceId, id) {
    return http.delete(`/posts/${id}?spaceId=${spaceId}`);
  }
  upvote(id) {
    return http.post(`/posts/${id}/votes`, { voteType: 1 });
  }
  downvote(id) {
    return http.post(`/posts/${id}/votes`, { voteType: -1 });
  }
}

export default new PostService();
