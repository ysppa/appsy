export default class User {
  constructor(props) {
    this.id = props ? props.id : null;
    this.username = props ? props.username : "";
    this.email = props ? props.email : "";
  }

  initials() {
    return this.username[0].toUpperCase();
  }
}
