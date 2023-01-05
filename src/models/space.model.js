export default class Space {
  constructor(props = {}) {
    this.id = props.id || null;
    this.userId = props.userId || null;
    this.name = props.name || "Empty space";
    this.logo = props.logo || "/assets/images/Logo.jpeg";
    this.coverPicture =
      props.coverPicture || "/assets/images/CoverPicture.jpeg";
    this.description = props.description || null;
  }
}
