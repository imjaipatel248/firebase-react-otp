import { Redirect } from "react-router-dom";

export const RedirectTo = (redirect) => {
  return <Redirect to={redirect}></Redirect>;
};
