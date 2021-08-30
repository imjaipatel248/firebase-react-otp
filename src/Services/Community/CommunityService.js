import { isAuthenticated } from "../auth/AuthService";
import firebase from "../../firebase";

export const addCommunity = async (
  name,
  purpose,
  tags,
  bulletPoints,
  description
) => {
  return new Promise((resolve, reject) => {
    let datatosave = {
      name,
      purpose,
      tags,
      bulletPoints,
      description,
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

export const getCommunity = async () => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("users/" + isAuthenticated())
      .once("value")
      .then((snapshot) => {
        resolve(snapshot.val());
      });
  });
};
