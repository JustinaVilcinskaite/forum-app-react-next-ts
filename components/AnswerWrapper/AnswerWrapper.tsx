import styles from "./styles.module.css";
import Answer from "../Answer/Answer";
import { Answer as AnswerProps } from "../../types/answer";

type AnswersWrapperProps = {
  answers: AnswerProps[];
  loggedInUserId: string | null;
  isUserLoggedIn: boolean;
  refetchData: () => void;
};

const AnswersWrapper = ({
  answers,
  loggedInUserId,
  isUserLoggedIn,
  refetchData,
}: AnswersWrapperProps) => {
  return (
    <div className={styles.main}>
      <h3>Answers</h3>
      {answers.length ? (
        answers.map((answer) => (
          <Answer
            key={answer.id}
            id={answer.id}
            answerText={answer.answerText}
            date={answer.date}
            gainedLikesNumber={answer.gainedLikesNumber}
            userId={answer.userId}
            loggedInUserId={loggedInUserId}
            isUserLoggedIn={isUserLoggedIn}
            userName={answer.userName}
            refetchData={refetchData}
          />
        ))
      ) : (
        <h4 className={styles.message}>No answers yet</h4>
      )}
    </div>
  );
};

export default AnswersWrapper;
