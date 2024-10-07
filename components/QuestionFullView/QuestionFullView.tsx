import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../Button/Button";
import { deleteQuestion as deleteQuestionApi } from "../../apiCalls/question";
import { formatDate } from "../../utils/dateFormatter";
import Modal from "../Modal/Modal";

type QuestionProps = {
  id: string;
  questionTitle: string;
  questionText: string;
  name: string;
  date: string;
  userId: string;
  loggedInUserId: string | null;
  isUserLoggedIn: boolean;
};

const Question = ({
  id,
  questionTitle,
  questionText,
  date,
  userId,
  name,
  loggedInUserId,
  isUserLoggedIn,
}: QuestionProps) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isActionComplete, setActionComplete] = useState(false);

  const deleteQuestion = async (id: string) => {
    try {
      const response = await deleteQuestionApi(id);

      if (response.status === 200) {
        setTimeout(() => {
          setModalOpen(false);
          router.push("/questions");
        }, 2000);

        setActionComplete(true);
      }
    } catch (err) {
      console.log("Error deleting question", err);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.questionWrapper}>
        <div className={styles.questionContent}>
          <h2>{questionTitle}</h2>
          <p>{questionText}</p>
        </div>
        <div className={styles.userDateWrapper}>
          <h5>{name}</h5>
          <h5>{formatDate(date)}</h5>
        </div>
      </div>

      {isUserLoggedIn && loggedInUserId === userId && (
        <Button
          title="Delete"
          onClick={() => setModalOpen(true)}
          type="DANGER"
        />
      )}

      {isModalOpen && (
        <Modal
          text={
            isActionComplete
              ? "The question has been successfully deleted."
              : "Are you sure you want to delete your question?"
          }
          onConfirm={
            !isActionComplete
              ? () => deleteQuestion(id)
              : () => setModalOpen(false)
          }
          onCancel={() => setModalOpen(false)}
          isActionComplete={isActionComplete}
        />
      )}
    </div>
  );
};

export default Question;
