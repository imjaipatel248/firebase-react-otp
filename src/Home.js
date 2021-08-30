import "./App.css";
import React from "react";
import logo from "./Friends.png";
import CardsScreen from "./Screens/Home/CardsScreen";

function App() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#faf8f3",
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
        className="App pt-5 pb-5"
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
        <img src={logo} className="friend-image" alt="logo" />
      </div>
      <CardsScreen />
    </div>
  );
}

export default App;
