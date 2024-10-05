import { useState } from "react";
import styles from "./styles.module.css";
import { postAnswer as postAnswerApi } from "../../apiCalls/answer";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { validateAnswer } from "../../dataValidations/answerValidation";
import Message from "../Message/Message";

type AnswerFormProps = {
  questionId: string;
  isUserLoggedIn: boolean;
  refetchData: () => void;
};

const AnswerForm = ({ isUserLoggedIn, refetchData }: AnswerFormProps) => {
  const [answerText, setAnswerText] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const router = useRouter();

  const questionId = router.query.id as string;

  const postAnswer = async () => {
    if (!isUserLoggedIn) {
      setMessage("You must be logged in to answer questions.");
      setError(true);
      return;
    }

    const validationMessage = validateAnswer({ answerText });
    if (validationMessage) {
      setMessage(validationMessage);
      setError(true);
      return;
    }

    try {
      const response = await postAnswerApi({
        answerText,
        questionId,
      });

      if (response.status === 201) {
        setError(false);
        setMessage("Answer posted successfully!");
        setAnswerText("");

        setTimeout(() => {
          setMessage("");
          refetchData();
        }, 1000);
      }
    } catch (err) {
      console.log("Error posting answer", err);
      setMessage("Error posting answer.");
      setError(true);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.answerForm}>
        <h1>Your Answer</h1>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Write your answer..."
        />

        <Button title="Sumbit" onClick={postAnswer} />

        {message && <Message text={message} isError={isError} />}
      </div>
    </div>
  );
};

export default AnswerForm;
