import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { Question } from "../../types/question";
import SpinnerMain from "../SpinnerMain/SpinnerMain";

type QuestionsWrapperProps = {
  questions: Question[];
  isLoading: boolean;
};

const QuestionsWrapper = ({ questions, isLoading }: QuestionsWrapperProps) => {
  return (
    <div className={styles.main}>
      {isLoading ? (
        <SpinnerMain />
      ) : questions.length ? (
        questions.map((q) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            questionTitle={q.questionTitle}
            questionText={q.questionText}
            date={q.date}
            name={q.name}
          />
        ))
      ) : (
        <div className={styles.message}>
          <h4>No questions yet...</h4>
        </div>
      )}
    </div>
  );
};

export default QuestionsWrapper;
