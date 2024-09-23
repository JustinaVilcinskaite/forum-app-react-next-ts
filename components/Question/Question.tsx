import styles from "./styles.module.css";
import Button from "../Button/Button";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

type QuestionProps = {
  id: string;
  questionTitle: string;
  questionText: string;
  date: string;
};

const Question = ({ id, questionTitle, questionText, date }: QuestionProps) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString();

  const router = useRouter();
  // const jwt = cookie.get(process.env.JWT_KEY as string);

  const jwt = cookie.get("forum_app_jwt");

  // const validateUser = async () => {
  //   try {
  //     const headers = {
  //       authorization: jwt,
  //     };

  //     const response = await axios.get(
  //       `${process.env.SERVER_URL}/login/validate`,
  //       {
  //         headers,
  //       }
  //     );

  //     if (response.status === 200) {

  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   validateUser();
  // }, []);

  const deleteQuestion = async () => {
    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.delete(
        `${process.env.SERVER_URL}/questions/${id}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      console.log("Error during question deletion:", err);
    }
  };

  return (
    <div className={styles.main}>
      <h4>{questionTitle}</h4>
      <p>{questionText}</p>
      <h5>{formattedDate}</h5>

      <Button
        title="Delete"
        onClick={() => deleteQuestion()}
        isLoading={false}
        type="DANGER"
      />
    </div>
  );
};

export default Question;
