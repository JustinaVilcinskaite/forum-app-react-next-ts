import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "../Button/Button";
import { postQuestion as postQuestionApi } from "../../apiCalls/question";
import { validateUser as validateUserApi } from "../../apiCalls/user";

const QuestionForm = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionText, setQuestionText] = useState("");

  //   const [isShowError, setShowError] = useState(false);
  //   const [isShowSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  //   later refactor, DRY
  // ar cia palikti funkcija

  const validateUser = async () => {
    try {
      const response = await validateUserApi();

      if (response.status !== 200) {
        router.push("/login");
      }

      //   setUserLoggedIn(true);
    } catch (err) {
      router.push("/login");
      console.log(err);
    }
  };

  const postQuestion = async () => {
    try {
      const response = await postQuestionApi({
        questionTitle,
        questionText,
      });
      //   TODO:fix this
      if (response.status === 201) {
        // setShowSuccess(true);
        // setShowError(false);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      //   setShowError(true);
    }
  };

  useEffect(() => {
    // if (!jwt) {
    //     router.push("/login");
    //   }
    validateUser();
  }, []);

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
        placeholder="Write your question..."
        onChange={(e) => {
          setQuestionText(e.target.value);
        }}
      />

      <Button isLoading={false} title="Sumbit" onClick={postQuestion} />

      {/* create a  reusable message component */}

      {/* {isShowError && (
        <h5 className={styles.error}>
          All fields are required. Please fill out the form.
        </h5>
      )}
      {isShowSuccess && (
        <h5 className={styles.success}>
          Work added to Portfolio successfully! Redirecting...
        </h5>
      )} */}
    </div>
  );
};

export default QuestionForm;
