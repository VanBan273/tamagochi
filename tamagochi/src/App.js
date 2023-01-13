import React, { useState } from "react";
import { useEffect } from "react";

const initialTime = new Date();

function Tamagotchi() {
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(50);
  const [health, setHealth] = useState(100);
  const [isAlive, setIsAlive] = useState(true);
  const [notification, setNotification] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function feed() {
    if (hunger < 100) {
      setHunger(hunger + 10);
      setScore(score + 10);
      setNotification("Yummy!");
    }
  }

  function cure() {
    if (health < 100) {
      setHealth(health + 10);
      setScore(score + 10);
      setNotification("I feel better!");
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
    } else {
      setIsAlive(false);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(decreaseValues, 10000);
    return () => clearInterval(intervalId);
  }, []);

  if (!isAlive) {
    return <div>Your Tamagotchi is dead.</div>;
  }

  return (
    <div>
      <div>Hunger: {hunger}</div>
      <div>Happiness: {happiness}</div>
      <button onClick={feed}>Feed</button>
      <button onClick={play}>Play</button>
    </div>
  );
}

export default Tamagotchi;
