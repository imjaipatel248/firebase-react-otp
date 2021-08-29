import { isAuthenticated } from "../auth/AuthService";
import firebase from "../../firebase";

export const addCommunity = async (name, community) => {
  return new Promise((resolve, reject) => {
    let datatosave = {
      name,
      community,
    };
    firebase
      .database()
      .ref("users/" + isAuthenticated())
      .update(datatosave)
      .then((snap) => {
        resolve(snap);
      })
      .catch((e) => console.log("community" + e));
  });
};
