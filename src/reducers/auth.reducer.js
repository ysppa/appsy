const LOAD_INITIAL_STATE = "LOAD_INITIAL_STATE";

export default function reducer(state = { user: {} }, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        ...action.payload,
        user: { ...action.payload.user, signedIn: true },
      };

    case "logout":
      return { user: {} };

    case LOAD_INITIAL_STATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      throw new Error("Unknown counter action");
  }
}
