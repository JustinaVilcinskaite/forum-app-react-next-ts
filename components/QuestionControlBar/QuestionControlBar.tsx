import styles from "./styles.module.css";
import Button from "../Button/Button";
import Link from "next/link";
import { useRouter } from "next/router";

type QuestionControlBarProps = {
  filterAll: () => void;
  filterAnswered: () => void;
  filterUnanswered: () => void;
};

const QuestionControlBar = ({
  filterAll,
  filterAnswered,
  filterUnanswered,
}: QuestionControlBarProps) => {
  const router = useRouter(); // Access the current route

  // Conditionally hide filter buttons if on the question details page (e.g., question/[id])
  const hideFilters = router.pathname === "/question/[id]";

  return (
    <div className={styles.main}>
      {!hideFilters && (
        <div className={styles.filterWrapper}>
          <Button
            isActive={false}
            title="All"
            onClick={filterAll}
            isLoading={false}
            type="SIGNOUT"
          />
          <Button
            isActive={false}
            title="Answered"
            onClick={filterAnswered}
            isLoading={false}
            type="SIGNOUT"
          />
          <Button
            isActive={false}
            title="Unanswered"
            onClick={filterUnanswered}
            isLoading={false}
            type="SIGNOUT"
          />
        </div>
      )}

      <Link href="/post-question" className={styles.askQuestionLink}>
        Ask Question
      </Link>
    </div>
  );
};

export default QuestionControlBar;
