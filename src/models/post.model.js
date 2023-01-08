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

  upvote(userId) {
    return new Promise((resolve, reject) => {
      try {
        if (userId === null) {
          throw new Error(`Can not upvote without a user`);
        }
        postService
          .upvote(userId, this.id)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }

  downvote(userId) {
    return postService.downvote(userId, this.id);
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
