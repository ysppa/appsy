export default class Comment {
  constructor(props = {}) {
    this.id = props.id || null;
    this.userId = props.userId || null;
    this.postId = props.postId || null;
    this.answerId = props.answerId || null;
    this.user = props.user || {};
    this.post = props.post || {};
    this.answer = props.answer || {};
    this.content = props.content || "";
    this.answers = props.answers || [];
    this.createdAt = new Date(props.createdAt || null);
    this.updatedAt = new Date(props.updatedAt || null);
  }
}
