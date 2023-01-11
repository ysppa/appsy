import httpCommon from "../http-common";

class FeedService {
  index(spaceId, data = {}) {
    const url = spaceId ? `/feeds/spaces/${spaceId}` : `/feeds/`;
    return httpCommon.get(url, {
      data: data,
    });
  }
}

export default new FeedService();
