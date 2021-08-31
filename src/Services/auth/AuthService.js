import firebase from "../../firebase";
export const isAuthenticated = () => {
  if (typeof window === "undefined") {
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
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {});
    next();
  }
};

export const signInWithPhoneNumber = async (
  value,
  recaptcha,
  setConfirm,
  setInValidCode,
  setVerifying
) => {
  await firebase
    .auth()
    .signInWithPhoneNumber("+" + value, recaptcha)
    .then((confirmResult) => {
      setConfirm(confirmResult);
      setVerifying(true);
    })
    .catch(function (error) {
      console.log(error);
      if (error.code === "auth/invalid-phone-number") {
        setInValidCode("Invalid phone number");
      } else if (error.code === "auth/invalid-verification-code") {
        setInValidCode("Invalid OTP.");
      } else {
        setInValidCode("Something went wrong.");
      }
    });
};
