import httpCommon from "../http-common";

class FeedService {
  index(userId, spaceId = null, data) {
    const url = spaceId
      ? `/feeds/users/${userId}/spaces/${spaceId}`
      : `/feeds/users/${userId}/`;
    return httpCommon.get(url, {
      data: data,
    });
  }
}

export default new FeedService();
