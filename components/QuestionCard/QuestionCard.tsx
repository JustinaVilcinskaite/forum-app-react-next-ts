import styles from "./styles.module.css";
import Link from "next/link";
// import { Question } from "../../types/question";

// pass the Question object to QuestionCardProps?

type QuestionCardProps = {
  id: string;
  questionTitle: string;
  questionText: string;
  date: string;
  // userId: string;
  //   question: Question;
};

const QuestionCard = ({
  id,
  questionTitle,
  questionText,
  date,
}: QuestionCardProps) => {
  // date
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString();

  return (
    <Link href={`/question/${id}`} className={styles.main}>
      <h4>{questionTitle}</h4>
      <p>{questionText}</p>
      <div className={styles.dateWrapper}>
        <span>asked</span>
        <h5>{formattedDate}</h5>
      </div>
    </Link>
  );
};

export default QuestionCard;
