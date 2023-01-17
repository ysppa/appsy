import { baseURL } from "../http-common";
import spaceService from "../services/space.service";
import Post from "./post.model";
import Question from "./question.model";

export default class Space {
  constructor(props = {}) {
    this.className = "Space";
    this.id = props.id || null;
    this.userId = props.userId || null;
    this.name = props.name || "Empty space";
    this.logo = JSON.stringify(props.logo) || "/assets/images/Logo.jpeg";
    this.coverPicture =
      JSON.stringify(props.coverPicture) || "/assets/images/CoverPicture.jpeg";
    this.description = props.description || null;
    this.posts = props.posts ? props.posts.map((p) => new Post(p)) : [];
    this.questions = props.questions
      ? props.questions.map((q) => new Question(q))
      : [];
  }

  fullLogo() {
    console.log(this.logo);
    return this.id
      ? (baseURL + "/" + this.logo).replaceAll('"', "")
      : this.logo;
  }

  fullCoverPicture() {
    return this.id
      ? (baseURL + "/" + this.coverPicture).replaceAll('"', "")
      : this.coverPicture;
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

  uploadLogo(data) {
    return spaceService.upload(this.id, "logo", data);
  }

  uploadCoverPicture(data) {
    return spaceService.upload(this.id, "coverPicture", data);
  }
}
