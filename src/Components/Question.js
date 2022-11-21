import React from "react";
import { nanoid } from "nanoid";

const Question = (props) => {
  const {
    identifier,
    question,
    allAnswers,
    chosenAnswer,
    correctAnswer,
    allowToShowRightAnswers,
    onHandleInputChange,
  } = props;

  const answersElements = allAnswers.map((answer, i) => {
    return (
      <li className="quest_list_item" key={nanoid()}>
        <input
          type="radio"
          name={question}
          className="quest_input"
          value={answer}
          id={identifier + i}
          checked={chosenAnswer === answer}
          onChange={(e) => onHandleInputChange(e)}
        />
        <label
          className={calculateClass(
            allowToShowRightAnswers,
            correctAnswer,
            answer
          )}
          htmlFor={identifier + i}
        >
          {answer}
        </label>
      </li>
    );
  });

// create a folder with actions like "utils" and move all functionality like this there
// all text names shold be in file with constants and be reusable
  const calculateClass = (allowToShowRightAnswers, correctAnswer, answer) => {
    swith (true) {
      case(allowToShowRightAnswers && chosenAnswer === answer && correctAnswer === answer):
        return "quest_label_chosen_and_correct";
      case(allowToShowRightAnswers && chosenAnswer === answer):
        return "quest_label_chosen_wrong";
      case(allowToShowRightAnswers && correctAnswer === answer): 
        return "quest_label_correct";
      case(chosenAnswer === answer): 
        return "quest_label_correct";
      default: 
         return "quest_label";
    }
//     if (
//       allowToShowRightAnswers &&
//       chosenAnswer === answer &&
//       correctAnswer === answer
//     )
//       return "quest_label_chosen_and_correct";
    
//     if (allowToShowRightAnswers && chosenAnswer === answer)
//       return "quest_label_chosen_wrong";
    
//     if (allowToShowRightAnswers && correctAnswer === answer)
//       return "quest_label_correct";
    
//     if (chosenAnswer === answer) return "quest_label_chosen";
//     return "quest_label";
//   }

  return (
    <div className="question">
      <h3 className="quest_title">{question}</h3>
      <ul className="quest_list">{answersElements}</ul>
      <div className="quest_divider />
    </div>
  );
};

export default Question;
