import Message from "./message.model";

export default class Group {
  constructor(props = {}) {
    this.id = props.id || null;
    this.adminId = props.adminId || null;
    this.name = props.name || "Unknown";
    this.members = props.members || [];
    this.messages = props.messages || [];
    this.createdAt = new Date(props.createdAt || null);
    this.updatedAt = new Date(props.updatedAt || null);
  }

  lastMessage() {
    return this.Messages()[0] || new Message();
  }

  Messages() {
    return this.messages.map((m) => new Message(m));
  }
}
