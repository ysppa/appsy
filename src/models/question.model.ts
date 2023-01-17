import Answer from "./answer.model";
import { IFollowable } from "../interfaces/followable.interface";
import User from "./user.model";
import questionService from "../services/question.service";

export default class Question implements IFollowable {
  public className: string;
  public id: number | undefined;
  public spaceId: number | undefined;
  public userId: number | undefined;
  public title: string;
  public answers: any[];
  public followers: any[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: any = {}) {
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

  removeAnswer(answerId: number) {
    this.answers = this.answers.filter((a) => a.id !== answerId);
  }

  addAnswer(answer: Answer) {
    this.answers.unshift(new Answer({ ...answer }));
  }

  strAnswers() {
    return this.id ? `${this.answers.length} answers` : null;
  }

  strPostedAt() {
    return this.id ? ` - Posted ${this.createdAt.toLocaleDateString()}` : null;
  }

  followedBy(user: User): boolean {
    return (
      this.followers.filter((follower: any) => follower.userId === user.id)
        .length > 0
    );
  }

  follow(): Promise<any> {
    return questionService.follow(this.id);
  }
}
