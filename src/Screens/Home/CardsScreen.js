import "react-tagsinput/react-tagsinput.css";
import React from "react";
import "react-phone-input-2/lib/material.css";
const cardsJson = [
  {
    title: "This community is fun",
    subTitle:
      "A real friend is one who walks in when the rest of the world walks out.",
    imageSource: "assets/img/user1.png",
  },
  {
    title: "It's prrtty easy",
    subTitle:
      "“Lots of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down.",
    imageSource: "assets/img/user2.png",
  },
  {
    title: "Be friend with others",
    subTitle:
      "If you live to be a hundred, I hope I live to be a hundred minus one day, so I never have to live without you.",
    imageSource: "assets/img/user3.png",
  },
];

const CardsScreen = () => {
  return (
    <div className="App mb-5 p-5 row">
      {cardsJson.map((card, i) => (
        <div className="col-sm-4 mt-2 d-flex justify-content-center">
          <div class="card" style={{ width: "18rem" }}>
            <img class="card-img-top" src={card.imageSource} alt="" />
            <div class="card-body">
              <h5 class="card-title">{card.title}</h5>
              <p class="card-text">{card.subTitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsScreen;
