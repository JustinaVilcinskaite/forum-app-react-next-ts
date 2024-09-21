import styles from "./styles.module.css";

// pass the Answer object to type Props?

type AnswerProps = {
  // id: string;
  answerText: string;
  date: string;
  gainedLikesNumber: number;
};

// TODO: delete answer functionality
// TODO: like dislike answer functionality

const Answer = ({ answerText, date }: AnswerProps) => {
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString();

  return (
    <div className={styles.main}>
      <p>{answerText}</p>
      <h5>{formattedDate}</h5>
    </div>
  );
};

export default Answer;
