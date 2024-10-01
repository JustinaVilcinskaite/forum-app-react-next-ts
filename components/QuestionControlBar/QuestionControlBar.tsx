import styles from "./styles.module.css";
import Button from "../Button/Button";
import { useRouter } from "next/router";
import Link from "next/link";

//  padaryti  gal du atskurus komponentus paziureti kaip onclick page template veikia

type QuestionControlBarProps = {
  onClick: (filter: string) => void;
};

const QuestionControlBar = ({ onClick }: QuestionControlBarProps) => {
  const router = useRouter();

  const hiddenPaths = ["/login", "/signup", "/post-question"];
  const displayAskQuestionLink = !hiddenPaths.includes(router.pathname);
  return (
    <div className={styles.main}>
      <div className={styles.filterWrapper}>
        <Button
          isActive={false}
          title="All"
          onClick={() => onClick("all")}
          isLoading={false}
          type="SIGNOUT"
        />
        <Button
          isActive={false}
          title="Answered"
          onClick={() => onClick("answered")}
          isLoading={false}
          type="SIGNOUT"
        />
        <Button
          isActive={false}
          title="Unanswered"
          onClick={() => onClick("unanswered")}
          isLoading={false}
          type="SIGNOUT"
        />
      </div>

      {displayAskQuestionLink && (
        <Link href="/post-question" className={styles.askQuestionLink}>
          Ask Question
        </Link>
      )}
    </div>
  );
};

export default QuestionControlBar;
