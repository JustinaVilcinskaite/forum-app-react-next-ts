import { useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";
import styles from "./styles.module.css";

type AnswerFormProps = {
  questionId: string;
  isUserLoggedIn: boolean;
};

const AnswerForm = ({ questionId, isUserLoggedIn }: AnswerFormProps) => {
  const [answerText, setAnswerText] = useState("");
  const [message, setMessage] = useState("");
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const jwt = cookie.get(process.env.JWT_KEY as string);

  // const validateUser = async () => {
  //   try {
  //     const headers = {
  //       authorization: jwt,
  //     };

  //     const response = await axios.get(
  //       `${process.env.SERVER_URL}/login/validate`,
  //       { headers }
  //     );

  //     // if (response.status !== 200) {
  //     //   setMessage("you have to be logged in");
  //     // }

  //     if (response.status === 200) {
  //       setIsUserLoggedIn(true);
  //     }
  //   } catch (err) {
  //     console.log("Error in validation:", err);
  //   }
  // };

  // useEffect(() => {
  //   validateUser();
  // }, []);

  const postAnswer = async () => {
    if (!isUserLoggedIn) {
      setMessage("You must be logged in to answer.");
      return;
    }

    try {
      const body = {
        answerText: answerText,
      };

      const headers = {
        authorization: jwt,
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/questions/${questionId}/answers`,
        body,
        { headers }
      );

      // set timeout
      if (response.status === 201) {
        // setShowSuccess(true);
        // setShowError(false);

        setMessage("Answer posted successfully!");
        setAnswerText("");
      }

      // if (response.status === 200) {
      //   setMessage("Answer posted successfully!");
      //   setAnswerText("");
      //   // fetchAnswers();
      // }
    } catch (err) {
      console.error("Error posting answer:", err);
      setMessage("Error posting answer.");
    }
  };

  return (
    <div className={styles.main}>
      {isUserLoggedIn ? (
        <div>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Write your answer..."
            required
          />
          <button onClick={postAnswer}>Submit Answer</button>
        </div>
      ) : (
        <p>You must be logged in to answer questions.</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AnswerForm;
