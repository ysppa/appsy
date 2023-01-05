export default class User {
  constructor(props = {}) {
    this.id = props.id || null;
    this.username = props.username || "Anonymous";
    this.email = props.email || "";
    this.avatar = props.avatar || "/assets/images/Logo.jpeg";
  }

  initials() {
    return this.username[0].toUpperCase();
  }
}
