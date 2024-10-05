import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { postQuestion as postQuestionApi } from "../../apiCalls/question";
import { validateQuestion } from "../../dataValidations/questionValidation";
import Message from "../Message/Message";

const QuestionForm = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);

  const router = useRouter();

  const postQuestion = async () => {
    const validationMessage = validateQuestion({ questionTitle, questionText });
    if (validationMessage) {
      setMessage(validationMessage);
      setError(true);
      return;
    }

    try {
      const response = await postQuestionApi({
        questionTitle,
        questionText,
      });

      if (response.status === 201) {
        setError(false);
        setMessage("Question posted successfully!");

        setTimeout(() => {
          router.push("/questions");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setMessage("Error posting question.");
      setError(true);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <h1>Ask your Question</h1>
        <input
          value={questionTitle}
          placeholder="Question Title"
          type="text"
          onChange={(e) => {
            setQuestionTitle(e.target.value);
          }}
        />
        <textarea
          value={questionText}
          placeholder="Write your question..."
          onChange={(e) => {
            setQuestionText(e.target.value);
          }}
        />

        <Button title="Sumbit" onClick={postQuestion} />

        {message && <Message text={message} isError={isError} />}
      </div>
    </div>
  );
};

export default QuestionForm;
