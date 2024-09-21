import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { Question } from "../../types/question";

type QuestionsWrapperProps = {
  questions: Question[];
};

const QuestionsWrapper = ({ questions }: QuestionsWrapperProps) => {
  return (
    <div className={styles.main}>
      {questions.map((question) => {
        return (
          <QuestionCard
            key={question.id}
            // id={question.id}
            questionText={question.questionText}
            date={question.date}
          />
        );
      })}
    </div>
  );
};

export default QuestionsWrapper;
