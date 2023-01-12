import spaceService from "../services/space.service";
import Post from "./post.model";
import Question from "./question.model";

export default class Space {
  constructor(props = {}) {
    this.id = props.id || null;
    this.userId = props.userId || null;
    this.name = props.name || "Empty space";
    this.logo = props.logo || "/assets/images/Logo.jpeg";
    this.coverPicture =
      props.coverPicture || "/assets/images/CoverPicture.jpeg";
    this.description = props.description || null;
    this.posts = props.posts ? props.posts.map((p) => new Post(p)) : [];
    this.questions = props.questions
      ? props.questions.map((q) => new Question(q))
      : [];
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  removeQuestion(questionId) {
    this.questions = this.questions.filter(
      (question) => question.id !== questionId
    );
  }

  update(data) {
    return spaceService.update(this.id, data);
  }
}
