export default class Question {
  constructor(props = {}) {
    this.id = props.id || null;
    this.title = props.title || null;
    this.answers = props.answers || [];
    this.followers = props.followers || [];
    this.createdAt = new Date(props.createdAt || null);
    this.updatedAt = new Date(props.updatedAt || null);
  }

  strAnswers() {
    return this.id ? `${this.answers.length} answers` : null;
  }

  strPostedAt() {
    return this.id ? ` - Posted ${this.createdAt.toLocaleDateString()}` : null;
  }
}
