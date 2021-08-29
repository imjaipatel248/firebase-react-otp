export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("userId")) {
    return JSON.parse(localStorage.getItem("userId"));
  }
  return false;
};