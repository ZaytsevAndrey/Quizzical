import React from "react";
import Question from "./Question";

const Questions = (props) => {
  const {
    questionsData,
    allowToShowRightAnswers,
    countOfRightAnswers,
    isTryAgainShown,
    onHandleAnswersCheck,
    onHandleInputChange,
    onHandleTryAgainClick,
  } = props;

  const elements = questionsData.map((quest) => {
    const { id, question, allAnswers, chosenAnswer, correctAnswer } = quest;

    return (
      <Question
        key={id}
        identifier={id}
        question={question}
        allAnswers={allAnswers}
        chosenAnswer={chosenAnswer}
        correctAnswer={correctAnswer}
        allowToShowRightAnswers={allowToShowRightAnswers}
        onHandleInputChange={onHandleInputChange}
      />
    );
  });

  return (
    <div className="questions_container">
      {elements}
      {isTryAgainShown ? (
        <div className="after_game_container">
          {countOfRightAnswers === 5 ? (
            <h2 className="after_game_title">Wow! You scored them all !</h2>
          ) : (
            <h2 className="after_game_title">
              You scored {countOfRightAnswers}/5
            </h2>
          )}
          <button className="play_again" onClick={onHandleTryAgainClick}>
            Play again
          </button>
        </div>
      ) : (
        <button
          className="check_answers"
          onClick={(e) => onHandleAnswersCheck(e)}
        >
          Check answers
        </button>
      )}
    </div>
  );
};

export default Questions;
