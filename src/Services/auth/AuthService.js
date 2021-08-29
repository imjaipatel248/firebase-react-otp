export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("userId")) {
    return JSON.parse(localStorage.getItem("userId"));
  }
  return false;
};
export const signOut = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userId");
    next();
  }
};
