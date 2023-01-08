export default class Vote {
  constructor(props = {}) {
    this.id = props.id || null;
    this.userId = props.userId || null;
    this.voteableType = props.voteableType || "Post";
    this.voteableId = props.voteableId || null;
    this.voteType = props.voteType || 1; // an integer that represents the type of vote (e.g. 1 for upvote, -1 for downvote)
  }
}
