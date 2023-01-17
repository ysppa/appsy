import { baseURL } from "../http-common";
import { ILogoAble } from "../interfaces/logoable.interface";
import spaceService from "../services/space.service";
import Post from "./post.model";
import Question from "./question.model";

export default class Space implements ILogoAble {
  public className: string;
  public id: number | undefined;
  public userId: number | null;
  public name: string;
  public logo: string;
  public coverPicture: string;
  public description: string;
  public posts: any[];
  public questions: any[];

  constructor(props: any = {}) {
    this.className = "Space";
    this.id = props.id || null;
    this.userId = props.userId || null;
    this.name = props.name || "Empty space";
    this.logo = JSON.stringify(props.logo || "assets/images/Logo.jpeg");
    this.coverPicture = JSON.stringify(
      props.coverPicture || "assets/images/CoverPicture.jpeg"
    );
    this.description = props.description || null;
    this.posts = props.posts ? props.posts.map((p: any) => new Post(p)) : [];
    this.questions = props.questions
      ? props.questions.map((q: any) => new Question(q))
      : [];
  }

  initials(): string {
    return this.name[0];
  }

  getLogo(): string {
    return this.logo;
  }

  fullLogo() {
    return this.id
      ? (baseURL + "/" + this.logo)
          .replaceAll('"', "")
          .replaceAll("://", "$")
          .replaceAll("\\", "/")
          .replaceAll("///", "/")
          .replaceAll("//", "/")
          .replaceAll("$", "://")
      : this.logo;
  }

  fullCoverPicture() {
    return this.id
      ? (baseURL + "/" + this.coverPicture).replaceAll('"', "")
      : this.coverPicture;
  }

  addQuestion(question: Question) {
    this.questions.push(question);
  }

  removeQuestion(questionId: number) {
    this.questions = this.questions.filter(
      (question) => question.id !== questionId
    );
  }

  update(data: any) {
    return spaceService.update(this.id, data);
  }

  uploadLogo(data: any) {
    return spaceService.upload(this.id, "logo", data);
  }

  uploadCoverPicture(data: any) {
    return spaceService.upload(this.id, "coverPicture", data);
  }
}
