import { useState } from "react";
import styles from "./styles.module.css";
import { postAnswer as postAnswerApi } from "../../apiCalls/answer";
import { useRouter } from "next/router";
import Button from "../Button/Button";

type AnswerFormProps = {
  isUserLoggedIn: boolean;
  refetchData: () => void;
};

const AnswerForm = ({ isUserLoggedIn, refetchData }: AnswerFormProps) => {
  const [answerText, setAnswerText] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  // ?
  const questionId = router.query.id as string;

  const postAnswer = async () => {
    try {
      if (!isUserLoggedIn) {
        setMessage("You must be logged in to answer.");
        return;
      }

      const response = await postAnswerApi({
        answerText,
        questionId,
      });

      if (response.status === 201) {
        setMessage("Answer posted successfully!");
        setAnswerText("");

        setTimeout(() => {
          setMessage("");
          refetchData();
        }, 1000);
      }
    } catch (err) {
      console.log("Error posting answer:", err);
      setMessage("Error posting answer.");
    }
  };

  // return (
  //   <>
  //     {isUserLoggedIn ? (
  //       <div className={styles.main}>
  //         <h1>Your answer</h1>
  //         <textarea
  //           value={answerText}
  //           onChange={(e) => setAnswerText(e.target.value)}
  //           placeholder="Write your answer..."
  //         />
  //         <Button isLoading={false} title="Submit" onClick={postAnswer} />
  //         {message && <h4>{message}</h4>}
  //       </div>
  //     ) : (
  //       <div className={styles.}>
  //         <h4>You must be logged in to answer questions.</h4>
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <div className={styles.main}>
      {isUserLoggedIn ? (
        <div className={styles.answerForm}>
          <h1>Your answer</h1>
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Write your answer..."
          />

          <Button isLoading={false} title="Sumbit" onClick={postAnswer} />

          {message && <h4 className={styles.message}>{message}</h4>}
        </div>
      ) : (
        <h4>You must be logged in to answer questions.</h4>
      )}
    </div>
  );
};

export default AnswerForm;

{
  /* <div className={styles.main}>
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

<Button isLoading={false} title="Sumbit" onClick={postQuestion} /> */
}
