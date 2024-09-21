import styles from "./styles.module.css";
import Answer from "../Answer/Answer";
import { Answer as AnswerProps } from "../../types/answer";

type AnswersWrapperProps = {
  answers: AnswerProps[];
};

const AnswersWrapper = ({ answers }: AnswersWrapperProps) => {
  return (
    <div className={styles.main}>
      {answers.map((answer) => {
        return (
          <Answer
            key={answer.id}
            // id={question.id}
            answerText={answer.answerText}
            date={answer.date}
            gainedLikesNumber={answer.gainedLikesNumber}
          />
        );
      })}
    </div>
  );
};

export default AnswersWrapper;
