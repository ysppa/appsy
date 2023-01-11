// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const handleError = (err, setAlert) => {
  let message;
  if (err.response && err.response.data && err.response.data.message) {
    message = err.response.data.message;
  } else {
    message = err.message;
  }
  setAlert({
    color: "danger",
    message: message,
    show: true,
  });
};
