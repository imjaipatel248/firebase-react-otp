import firebase from "../firebase";
import React, { useState, useMemo, useEffect } from "react";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";
import startsWith from "lodash.startswith";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../Services/auth/AuthService";
import { RedirectTo } from "../Services/CommonService";

const LoginScreen = () => {
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [redirect, setRedirect] = useState("");
  const [isValid, setIsValidNumber] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [verifying, setVerifying] = useState(false);
  if (isAuthenticated()) {
    setRedirect("/");
  }

  if (redirect) {
    return RedirectTo(redirect);
  }
  const isValidNumber = (inputNumber, country, countries) => {
    const valid = countries.some((country) => {
      return (
        startsWith(inputNumber, country.dialCode) ||
        startsWith(country.dialCode, inputNumber)
      );
    });
    setIsValidNumber(valid);
    return valid;
  };
  const handleClick = async () => {
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
          console.error(error);
        });
    } else {
      confirm
        .confirm(code)
        .then(function (result) {
          console.log(result.user);
          localStorage.setItem("userId", JSON.stringify(result.user.uid));
          setRedirect("/community");
        })
        .catch(function (error) {
          console.error(error);
          console.error("error");
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
              onChange={setValue}
              isValid={(inputNumber, country, countries) =>
                isValidNumber(inputNumber, country, countries)
              }
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
