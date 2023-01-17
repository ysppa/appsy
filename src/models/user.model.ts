import { Answer, Comment, Post, Vote } from ".";
import { baseURL } from "../http-common";
import { ILogoAble } from "../interfaces/logoable.interface";

export default class User implements ILogoAble {
  public className: string;
  public id: number | null;
  public username: string;
  public email: string;
  public avatar: string;

  constructor(props: any = {}) {
    this.className = "User";
    this.id = props.id || null;
    this.username = props.username || props.title || "Anonymous";
    this.email = props.email || "";
    this.avatar = props.avatar || props.logo || "/assets/images/Logo.jpeg";
  }

  initials(): string {
    return this.username[0].toUpperCase();
  }

  upVotedFor(post: Post | Comment | Answer): boolean {
    return (
      post.votes.filter((v: Vote) => v.userId === this.id && v.voteType === 1)
        .length > 0
    );
  }

  downVotedFor(post: Post | Comment | Answer): boolean {
    return (
      post.votes.filter((v: Vote) => v.userId === this.id && v.voteType === -1)
        .length > 0
    );
  }

  fullLogo(): string {
    return this.id
      ? (baseURL + "/" + this.avatar).replaceAll('"', "")
      : this.avatar;
  }
}
