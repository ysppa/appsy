export default class Answer {
  constructor(props = {}) {
    this.id = props.id;
    this.content = props.content || "";
    this.questionId = props.questionId;
    this.user = props.user !== null ? props.user : {};
    this.userId = props.userId;
  }
}
