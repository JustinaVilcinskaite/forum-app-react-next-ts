import styles from "./styles.module.css";
import Link from "next/link";

const QuestionNavBar = () => {
  return (
    <div className={styles.main}>
      <Link href="/post-question">Ask Question</Link>
    </div>
  );
};

export default QuestionNavBar;
