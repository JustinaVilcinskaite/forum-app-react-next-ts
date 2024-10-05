import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { Question } from "../../types/question";
import SpinnerMain from "../SpinnerMain/SpinnerMain";

type QuestionsWrapperProps = {
  questions: Question[];
};

const QuestionsWrapper = ({ questions }: QuestionsWrapperProps) => {
  return (
    <div className={styles.main}>
      {questions ? (
        questions.length ? (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              questionTitle={question.questionTitle}
              questionText={question.questionText}
              date={question.date}
              userName={question.userName}
            />
          ))
        ) : (
          <div className={styles.message}>
            <h4>No questions yet...</h4>
          </div>
        )
      ) : (
        <SpinnerMain />
      )}
    </div>
  );
};

export default QuestionsWrapper;
