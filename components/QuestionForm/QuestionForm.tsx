import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { submitQuestion as submitQuestionApi } from "../../apiCalls/question";

const QuestionForm = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionText, setQuestionText] = useState("");

  const [isShowError, setShowError] = useState(false);
  const [isShowSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  const submitQuestion = async () => {
    try {
      const response = await submitQuestionApi({
        questionTitle,
        questionText,
      });
      //   TODO:fix this
      if (response.status === 201) {
        setShowSuccess(true);
        setShowError(false);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setShowError(true);
    }
  };

  return (
    <div className={styles.main}>
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
        placeholder="Question"
        onChange={(e) => {
          setQuestionText(e.target.value);
        }}
      />

      <Button
        isLoading={false}
        title="Sumbit"
        onClick={() => {
          submitQuestion();
        }}
      />

      {/* create a  reusable message component */}

      {isShowError && (
        <h5 className={styles.error}>
          All fields are required. Please fill out the form.
        </h5>
      )}
      {isShowSuccess && (
        <h5 className={styles.success}>
          Work added to Portfolio successfully! Redirecting...
        </h5>
      )}
    </div>
  );
};

export default QuestionForm;
