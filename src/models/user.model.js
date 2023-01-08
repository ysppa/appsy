export default class User {
  constructor(props = {}) {
    this.id = props.id || null;
    this.username = props.username || props.title || "Anonymous";
    this.email = props.email || "";
    this.avatar = props.avatar || props.logo || "/assets/images/Logo.jpeg";
  }

  initials() {
    return this.username[0].toUpperCase();
  }

  upVotedFor(post) {
    return (
      post.votes.filter((p) => p.userId === this.id && p.voteType === 1)
        .length > 0
    );
  }

  downVotedFor(post) {
    return (
      post.votes.filter((p) => p.userId === this.id && p.voteType === -1)
        .length > 0
    );
  }
}
