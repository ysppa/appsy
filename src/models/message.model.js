import User from "./user.model";

export default class Message {
  constructor(props = {}) {
    this.id = props.id || null;
    this.userId = props.userId || null;
    this.groupId = props.groupId || null;
    this.body = props.body || "";
    this.files = props.files || [];
    this.user = new User(props.user);
    this.createdAt = new Date(props.createdAt || null);
    this.updatedAt = new Date(props.updatedAt || null);
  }

  strCreatedAt() {
    return this.createdAt.toLocaleTimeString();
  }
}
