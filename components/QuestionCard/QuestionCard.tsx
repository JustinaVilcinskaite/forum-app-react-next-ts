import styles from "./styles.module.css";
import Link from "next/link";
// import { Question } from "../../types/question";

// pass the Question object to QuestionCardProps?

type QuestionCardProps = {
  id: string;
  // tite:string;
  questionText: string;
  date: string;
  //   question: Question;
};

const QuestionCard = ({ id, questionText, date }: QuestionCardProps) => {
  // date
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString();

  return (
    <Link href={`/question/${id}`} className={styles.main}>
      <p>{questionText}</p>
      <h5>{formattedDate}</h5>
    </Link>
  );
};

export default QuestionCard;
