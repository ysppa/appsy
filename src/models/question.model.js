import Answer from "./answer.model";

export default class Question {
  constructor(props = {}) {
    this.className = "Question";
    this.id = props.id || null;
    this.spaceId = props.spaceId || null;
    this.userId = props.userId || null;
    this.title = props.title || null;
    this.answers = props.answers || [];
    this.followers = props.followers || [];
    this.createdAt = new Date(props.createdAt || null);
    this.updatedAt = new Date(props.updatedAt || null);
  }

  removeAnswer(answerId) {
    this.answers = this.answers.filter((a) => a.id !== answerId);
  }

  addAnswer(answer) {
    this.answers.unshift(new Answer({ ...answer }));
  }

  strAnswers() {
    return this.id ? `${this.answers.length} answers` : null;
  }

  strPostedAt() {
    return this.id ? ` - Posted ${this.createdAt.toLocaleDateString()}` : null;
  }
}
