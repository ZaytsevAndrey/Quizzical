import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "./Confetti.js";
import Modal from "./Components/Modal";
import Questions from "./Components/Questions";

export default function App() {
  const [isModalShown, setIsModalShown] = useState(true);
  const [isTryAgainShown, setTryAgainShown] = useState(false);
  const [useEffectTrigger, setUseEffectTrigger] = useState(1);
  const [countOfRightAnswers, setCountOfRightAnswers] = useState(0);
  const [allowToShowRightAnswers, setAllowToShowRightAnswers] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      await fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res;
        })
        .then((res) => res.json())
        .then((data) =>
          data.results.forEach((quiz) => {
            setData((prevData) => [
              ...prevData,
              {
                id: nanoid(),
                question: removeParsedHtml(quiz.question),
                correctAnswer: quiz.correct_answer,
                allAnswers: [quiz.correct_answer, ...quiz.incorrect_answers]
                  .sort(() => 0.5 - Math.random())
                  .map((item) => removeParsedHtml(item)),
                chosenAnswer: "",
              },
            ]);
          })
        )
        .catch((error) => console.log(error));
    }
    getData();
  }, [useEffectTrigger]);

  const removeParsedHtml = (str) => {
    return str
      .replaceAll(";", "")
      .replaceAll("&amp", "")
      .replaceAll("&quot", '"')
      .replaceAll("&apos", "'")
      .replaceAll("&#039", "'");
  };

  const hideModal = () => {
    setIsModalShown(false);
  };

  const handleInputChange = (e) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.question === e.target.name
          ? { ...item, chosenAnswer: e.target.value }
          : item
      )
    );
  };

  const handleAnswersCheck = (e) => {
    e.preventDefault();

    data.forEach((item) =>
      item.chosenAnswer === item.correctAnswer
        ? setCountOfRightAnswers((prev) => prev + 1)
        : null
    );

    setAllowToShowRightAnswers(true);
    setTryAgainShown(true);
  };

  const handleTryAgainClick = () => {
    setData([]);
    setTryAgainShown(false);
    setCountOfRightAnswers(0);
    setUseEffectTrigger((prev) => prev + 1);
    setAllowToShowRightAnswers(false);
  };

  return (
    <main>
      {isModalShown ? (
        <Modal onHideModal={hideModal} />
      ) : (
        <>
          {isTryAgainShown && <Confetti />}
          <Questions
            questionsData={data}
            isTryAgainShown={isTryAgainShown}
            countOfRightAnswers={countOfRightAnswers}
            allowToShowRightAnswers={allowToShowRightAnswers}
            onHandleTryAgainClick={handleTryAgainClick}
            onHandleInputChange={handleInputChange}
            onHandleAnswersCheck={handleAnswersCheck}
          />
        </>
      )}
    </main>
  );
}
