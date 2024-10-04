import styles from "./styles.module.css";
import Button from "../Button/Button";

type QuestionFilterBarProps = {
  filterAll: () => void;
  filterAnswered: () => void;
  filterUnanswered: () => void;
};

const QuestionFilterBar = ({
  filterAll,
  filterAnswered,
  filterUnanswered,
}: QuestionFilterBarProps) => {
  return (
    <div className={styles.main}>
      <Button title="All" onClick={filterAll} type="FILTER" />
      <Button title="Answered" onClick={filterAnswered} type="FILTER" />
      <Button title="Unanswered" onClick={filterUnanswered} type="FILTER" />
    </div>
  );
};

export default QuestionFilterBar;
