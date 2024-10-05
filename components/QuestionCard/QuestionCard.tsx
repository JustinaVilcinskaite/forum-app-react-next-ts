import styles from "./styles.module.css";
import Link from "next/link";
import { formatDate } from "../../utils/dateFormatter";
// import { Question } from "../../types/question";

// pass the Question object to QuestionCardProps?

type QuestionCardProps = {
  id: string;
  questionTitle: string;
  questionText: string;
  date: string;
  userName: string;
  // userId: string;
  //   question: Question;
};

const QuestionCard = ({
  id,
  questionTitle,
  questionText,
  date,
  userName,
}: QuestionCardProps) => {
  // date
  // const dateObj = new Date(date);

  // const formattedDate = dateObj.toLocaleDateString();

  return (
    <Link href={`/question/${id}`} className={styles.main}>
      <div className={styles.userDateWrapper}>
        <h5>{userName}</h5>
        <h5>{formatDate(date)}</h5>
      </div>

      <div className={styles.questionContent}>
        <h3>{questionTitle}</h3>
        <p>{questionText}</p>
      </div>
    </Link>
  );
};

export default QuestionCard;
