import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../Button/Button";
import { deleteQuestion as deleteQuestionApi } from "../../apiCalls/question";
import Modal from "../Modal/Modal";

// TODO: add a MODAL
// pass the Question object to type Props?

type QuestionProps = {
  id: string;
  questionTitle: string;
  questionText: string;
  userName: string;
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
  userName,
  loggedInUserId,
  isUserLoggedIn,
}: QuestionProps) => {
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString();

  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [message, setMessage] = useState("");

  const deleteQuestion = async (id: string) => {
    try {
      const response = await deleteQuestionApi(id);

      if (response.status === 200) {
        setIsDeleted(true);

        setTimeout(() => {
          setModalOpen(false);
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.log("Error during question deletion:", err);
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
          <h5>{userName}</h5>
          <h5>{formattedDate}</h5>
        </div>
      </div>

      {/* <h5>{new Date(date).toLocaleDateString()}</h5> */}

      {isUserLoggedIn && loggedInUserId === userId && (
        <Button
          title="Delete"
          // onClick={deleteQuestion}
          onClick={() => setModalOpen(true)}
          type="DANGER"
        />
      )}

      {isModalOpen && (
        <Modal
          text={
            isDeleted
              ? "The question has been successfully deleted."
              : "Are you sure you want to delete your question?"
          }
          onConfirm={
            !isDeleted ? () => deleteQuestion(id) : () => setModalOpen(false)
          }
          onCancel={() => setModalOpen(false)}
          isDeleted={isDeleted}
        />
      )}
    </div>
  );
};

export default Question;
