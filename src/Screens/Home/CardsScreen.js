import "react-tagsinput/react-tagsinput.css";
import React from "react";
import "react-phone-input-2/lib/material.css";
const cardsJson = [
  {
    title: "This community is fun",
    subTitle: "Amet minim molit",
    imageSource: "assets/img/user1.png",
  },
  {
    title: "This community is fun",
    subTitle: "Amet minim molit",
    imageSource: "assets/img/user2.png",
  },
  {
    title: "This community is fun",
    subTitle: "Amet minim molit",
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
