import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { deleteQuestion as deleteQuestionApi } from "../../apiCalls/question";

// TODO: add a MODAL
// pass the Question object to type Props?

type QuestionProps = {
  id: string;
  questionTitle: string;
  questionText: string;
  date: string;
  userId: string; // user who posted the question
  loggedInUserId: string | null;
  isUserLoggedIn: boolean;

  //   question: Question;
};

const Question = ({
  id,
  questionTitle,
  questionText,
  date,
  userId,
  loggedInUserId,
  isUserLoggedIn,
}: QuestionProps) => {
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString();

  const router = useRouter();

  const deleteQuestion = async () => {
    try {
      const response = await deleteQuestionApi(id);

      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.log("Error during question deletion:", err);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.qustionContent}>
        <h4>{questionTitle}</h4>
        <p>{questionText}</p>

        <div className={styles.dateWrapper}>
          <span>asked</span>
          <h5>{formattedDate}</h5>
        </div>
        {/* <h5>{new Date(date).toLocaleDateString()}</h5> */}
      </div>

      {isUserLoggedIn && loggedInUserId === userId && (
        <Button
          title="Delete"
          onClick={deleteQuestion}
          isActive={false}
          isLoading={false}
          type="DANGER"
        />
      )}
    </div>
  );
};

export default Question;
