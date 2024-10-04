import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { postQuestion as postQuestionApi } from "../../apiCalls/question";
// import { validateUser as validateUserApi } from "../../apiCalls/user";
import { validateQuestion } from "../../dataValidations/questionValidation";
import Message from "../Message/Message";

const QuestionForm = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);

  //   const [isShowError, setShowError] = useState(false);
  //   const [isShowSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  //   later refactor, DRY
  // ar cia palikti funkcija

  // const validateUser = async () => {
  //   try {
  //     const response = await validateUserApi();

  //     if (response.status !== 200) {
  //       router.push("/login");
  //     }

  //     //   setUserLoggedIn(true);
  //   } catch (err) {
  //     router.push("/login");
  //     console.log(err);
  //   }
  // };

  const postQuestion = async () => {
    const validationMessage = validateQuestion({ questionTitle, questionText });
    if (validationMessage) {
      setMessage(validationMessage);
      setError(true); // Set success to false if validation fails
      return;
    }

    try {
      const response = await postQuestionApi({
        questionTitle,
        questionText,
      });
      //   TODO:fix this
      if (response.status === 201) {
        setError(false);
        setMessage("Question posted successfully!");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setMessage("Error posting question.");
      setError(true);
    }
  };

  // useEffect(() => {
  //   // if (!jwt) {
  //   //     router.push("/login");
  //   //   }
  //   validateUser();
  // }, []);

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

        <Button
          isLoading={false}
          isActive={false}
          title="Sumbit"
          onClick={postQuestion}
        />

        {message && <Message text={message} isError={isError} />}
      </div>
    </div>
  );
};

export default QuestionForm;
