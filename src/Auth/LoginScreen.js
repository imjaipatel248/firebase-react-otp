import firebase from "../firebase";
import React, { useState } from "react";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import { isAuthenticated } from "../Services/auth/AuthService";
import { RedirectTo } from "../Services/CommonService";

const LoginScreen = () => {
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [redirect, setRedirect] = useState("");
  const [inValidCode, setInValidCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [verifying, setVerifying] = useState(false);

  if (redirect) {
    return RedirectTo(redirect);
  }
  if (isAuthenticated()) {
    return setRedirect("/");
  }
  const onChangePhoneNumber = (val) => {
    setValue(val);
    setInValidCode("");
  };
  const handleClick = async () => {
    setInValidCode("");
    if (!verifying) {
      var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
      await firebase
        .auth()
        .signInWithPhoneNumber("+" + value, recaptcha)
        .then((confirmResult) => {
          setConfirm(confirmResult);
          setVerifying(true);
        })
        .catch(function (error) {
          if (error.code === "auth/invalid-phone-number") {
            setInValidCode("Invalid phone number");
          } else if (error.code === "auth/invalid-verification-code") {
            setInValidCode("Invalid OTP.");
          } else {
            setInValidCode("Something went wrong.");
          }
        });
    } else {
      confirm
        .confirm(code)
        .then(function (result) {
          console.log(result.user);
          localStorage.setItem("userId", JSON.stringify(result.user.uid));
          setRedirect("/show-community");
        })
        .catch(function (error) {
          console.error(error);
          if (error.code === "auth/invalid-verification-code") {
            setInValidCode("Invalid OTP.");
          } else {
            setInValidCode("Something went wrong.");
          }
        });
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#faf8f3",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      }}
      className="App pt-1 d-flex justify-content-center"
    >
      <div className="p-5">
        <label></label>
        {!verifying && <div className="pb-2" id="recaptcha"></div>}
        <div className="pt-4">
          {!verifying && (
            <PhoneInput
              country="in"
              placeholder="Enter phone number"
              value={value}
              onChange={onChangePhoneNumber}
              isValid={inValidCode.length === 0}
            />
          )}
          {verifying && (
            <div class="form-group mx-sm-3">
              <input
                type="text"
                class="form-control"
                value={code}
                placeholder="OTP"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </div>
          )}
          <label>{inValidCode}</label>
        </div>
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-dark mt-3"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
