import styles from "./styles.module.css";
import Link from "next/link";
import { formatDate } from "../../utils/dateFormatter";
import type { Question } from "../../types/question";

type QuestionCardProps = Pick<
  Question,
  "id" | "questionTitle" | "questionText" | "date" | "name"
>;

const QuestionCard = ({
  id,
  questionTitle,
  questionText,
  date,
  name,
}: QuestionCardProps) => {
  return (
    <Link href={`/question/${id}`} className={styles.main}>
      <div className={styles.questionContent}>
        <h3>{questionTitle}</h3>
        <p>{questionText}</p>
      </div>
      <div className={styles.userDateWrapper}>
        <h5>{name}</h5>
        <h5>{formatDate(date)}</h5>
      </div>
    </Link>
  );
};

export default QuestionCard;
