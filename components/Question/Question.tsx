import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "../Button/Button";

import { deleteQuestion as deleteQuestionApi } from "../../apiCalls/question";
import { validateUser as validateUserApi } from "../../apiCalls/user";

// Answer question functionality
// Question and QuestionCard very similar/reuse?
// TODO: add a MODAL
// pass the Question object to type Props?

type QuestionProps = {
  id: string;
  questionTitle: string;
  questionText: string;
  date: string;
  userId: string; // user who posted the question

  //   question: Question;
};

const Question = ({
  id,
  questionTitle,
  questionText,
  date,
  userId,
}: QuestionProps) => {
  // ?
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const router = useRouter();

  const validateUser = async () => {
    try {
      // const headers = {
      //   authorization: jwt,
      // };

      // const response = await axios.get(
      //   `${process.env.SERVER_URL}/login/validate`,
      //   {
      //     headers,
      //   }
      // );

      const response = await validateUserApi();

      if (response.status === 200) {
        setUserLoggedIn(true);
        setLoggedInUserId(response.data.userId);
      }

      //  setUserLoggedIn(true);
      //   setLoggedInUserId(response.data.userId);
    } catch (err) {
      console.log("Error in validation:", err);
    }
  };

  useEffect(() => {
    validateUser();
  }, []);

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
        <h5>{new Date(date).toLocaleDateString()}</h5>
      </div>

      {isUserLoggedIn && loggedInUserId === userId && (
        <Button
          title="Delete"
          onClick={() => deleteQuestion()}
          isLoading={false}
          type="DANGER"
        />
      )}
    </div>
  );
};

export default Question;
