import postService from "../services/post.service";
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
    this.votes = props.votes || [];
    this.createdAt = new Date(props.createdAt || null);
    this.updatedAt = new Date(props.updatedAt || null);
  }

  upvote() {
    return postService.upvote(this.id);
  }

  downvote() {
    return postService.downvote(this.id);
  }

  upVotes() {
    return this.votes.filter((vote) => vote.voteType === 1);
  }

  downVotes() {
    return this.votes.filter((vote) => vote.voteType === -1);
  }

  removeComment(commentId) {
    this.comments = this.comments.filter((a) => a.id !== commentId);
  }

  addComment(comment) {
    this.comments.unshift(new Comment({ ...comment }));
  }
}
