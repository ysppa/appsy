import answerService from "../services/answer.service";

export default class Answer {
  constructor(props = {}) {
    this.id = props.id;
    this.content = props.content || "";
    this.questionId = props.questionId;
    this.user = props.user !== null ? props.user : {};
    this.userId = props.userId;
    this.votes = props.votes || [];
  }

  upvote(userId) {
    return answerService.upvote(userId, this.id);
  }

  downvote(userId) {
    return answerService.downvote(userId, this.id);
  }

  upVotes() {
    return this.votes.filter((vote) => vote.voteType === 1);
  }

  downVotes() {
    return this.votes.filter((vote) => vote.voteType === -1);
  }
}
