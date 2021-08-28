import "./App.css";
import firebase from "./firebase";
import React, { useState, useMemo } from "react";

function App() {
  const [value, setValue] = useState("");
  console.log(value);

  const handleClick = () => {
    var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
    var number = "+919106670204";
    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then(function (e) {
        console.error("no error");
        var code = prompt("Enter the otp", "");

        if (code === null) return;

        e.confirm(code)
          .then(function (result) {
            console.log(result.user);

            document.querySelector("label").textContent +=
              result.user.phoneNumber + "Number verified";
          })
          .catch(function (error) {
            console.error(error);
            console.error("error");
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div
      style={{
        backgroundColor: "#faf8f3",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      }}
      className="App pt-5"
    >
      <div className="p-5">
        <h2 style={{ fontSize: "3vw" }}>
          Hey there! heving <br />
          trouble making friends?
        </h2>
        <p className="mx-3" style={{ fontSize: "2vw" }}>
          We are happy to help you find your friends,no matter what you are we
          always happy to welcome you. We just be friends here.
        </p>
        <button type="button" class="btn btn-dark mt-3">
          Join us now
        </button>
      </div>
      <label></label>
      <div id="recaptcha"></div>
    </div>
  );
}

export default App;
