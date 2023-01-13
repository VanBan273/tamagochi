import React, { useState, useEffect } from "react";
import happy from "./images/happy.png";
import sad from "./images/sad.png";

function Tamagotchi() {
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [isAlive, setIsAlive] = useState(true);
  const [notification, setNotification] = useState("");
  const [score, setScore] = useState(0);
  const [image, setImage] = useState(happy);

  function feed() {
    if (hunger < 100) {
      setHunger(hunger + 10);
      setScore(score + 10);
      setNotification("Yummy!");
    }
  }

  function play() {
    if (happiness < 100) {
      setHappiness(happiness + 10);
      setScore(score + 10);
      setNotification("Fun!");
    }
  }

  function decreaseValues() {
    if (hunger > 0 && happiness > 0) {
      setHunger(hunger - 10);
      setHappiness(happiness - 10);
      setScore(score - 10);
    } else {
      setIsAlive(false);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(decreaseValues, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (hunger < 20 || happiness < 20) {
      setNotification("I am feeling bad!");
      setImage(sad);
    } else {
      setNotification("");
      setImage(happy);
    }
  }, [hunger, happiness]);

  if (!isAlive) {
    return <div>Your Tamagotchi is dead. Your final score is {score}</div>;
  }

  return (
    <div>
      <img src={image} alt="Tamagotchi" />
      <div>Hunger: {hunger}</div>
      <div>Happiness: {happiness}</div>
      <div>Score: {score}</div>
      <div>{notification}</div>
      <button onClick={feed}>Feed</button>
      <button onClick={play}>Play</button>
    </div>
  );
}

export default Tamagotchi;
