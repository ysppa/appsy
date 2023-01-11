import commentService from "./../services/comment.service";

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
    this.votes = props.votes || [];
    this.createdAt = new Date(props.createdAt || null);
    this.updatedAt = new Date(props.updatedAt || null);
  }

  upvote(userId) {
    return commentService.upvote(userId, this.id);
  }

  downvote(userId) {
    return commentService.downvote(userId, this.id);
  }

  upVotes() {
    return this.votes.filter((vote) => vote.voteType === 1);
  }

  downVotes() {
    return this.votes.filter((vote) => vote.voteType === -1);
  }
}
