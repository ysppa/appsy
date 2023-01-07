import Comment from "./comment.model";

export default class Post {
  constructor(props = {}) {
    this.className = "Post";
    this.id = props.id || null;
    this.userId = props.userId || null;
    this.spaceId = props.spaceId || null;
    this.content = props.content || "";
    this.user = props.user || {};
    this.space = props.space || {};
    this.comments = props.comments || [];
    this.createdAt = new Date(props.createdAt || null);
    this.updatedAt = new Date(props.updatedAt || null);
  }

  removeComment(commentId) {
    this.comments = this.comments.filter((a) => a.id !== commentId);
  }

  addComment(comment) {
    this.comments.unshift(new Comment({ ...comment }));
  }
}
