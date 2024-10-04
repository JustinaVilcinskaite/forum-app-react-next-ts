import styles from "./styles.module.css";
import likeBtn from "../../assets/like-btn.svg";
import dislikeBtn from "../../assets/dislike-btn.svg";
import { useState } from "react";
import Button from "../Button/Button";
import {
  postDislikeAnswer,
  postLikeAnswer,
  fetchNetScore as fetchNetScoreApi,
  deleteAnswer as deleteAnswerApi,
} from "../../apiCalls/answer";
import { useRouter } from "next/router";
// import { AxiosError } from "axios";
import Modal from "../Modal/Modal";

// pass the Answer object to type Props?

type AnswerProps = {
  id: string;
  answerText: string;
  date: string;
  gainedLikesNumber: number;
  // questionId: string;
  userId: string;
  loggedInUserId: string | null;
  isUserLoggedIn: boolean;
  userName: string;
  // ?
  refetchData: () => void;
};

const Answer = ({
  id,
  answerText,
  date,
  gainedLikesNumber,
  userId,
  loggedInUserId,
  isUserLoggedIn,
  userName,
  refetchData,
}: AnswerProps) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString();
  const [netScoreLikes, setNetScoreLikes] = useState(gainedLikesNumber);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // const router = useRouter();

  const [message, setMessage] = useState("");

  // paprasta delete funcija
  // id: string reikalinga ?
  const deleteAnswer = async (id: string) => {
    try {
      const response = await deleteAnswerApi(id);

      if (response.status === 200) {
        setIsDeleted(true);
        setTimeout(() => {
          setModalOpen(false);
          refetchData();
        }, 2000);
      }
    } catch (err) {
      console.log("Error deleting answer:", err);
    }
  };

  // delete su axios error zinute, jei vartotot jwt galiojimas baigesi
  // const deleteAnswer = async (id: string) => {
  //   try {
  //     const response = await deleteAnswerApi(id);

  //     if (response.status === 200) {
  //       setIsDeleted(true);
  //       setTimeout(() => {
  //         setModalOpen(false);
  //         refetchData();
  //       }, 2000);
  //     }
  //   } catch (err) {
  //     const axiosError = err as AxiosError;

  //     if (axiosError.response?.status === 401) {
  //       setMessage("Your session has expired. Please log in again.");

  //       setTimeout(() => {
  //         router.push("/login");
  //       }, 2000);
  //     } else {
  //       console.log("Error deleting answer", err);
  //     }
  //   }
  // };

  const fetchNetScore = async () => {
    try {
      const response = await fetchNetScoreApi(id);
      if (response.status === 200) {
        setNetScoreLikes(response.data.gainedLikesNumber);
      }
    } catch (err) {
      console.log("Error fetching like/dislike status:", err);
    }
  };

  const handleLike = async () => {
    if (!isUserLoggedIn) {
      setMessage("Log in to interact!");
      return;
    }
    try {
      const response = await postLikeAnswer(id);

      if (response.status === 200) {
        await fetchNetScore();
      }
    } catch (err) {
      console.log("Error liking the answer:", err);
    }
  };

  const handleDislike = async () => {
    if (!isUserLoggedIn) {
      setMessage("Log in to interact!");
      return;
    }
    try {
      const response = await postDislikeAnswer(id);

      if (response.status === 200) {
        await fetchNetScore();
      }
    } catch (err) {
      console.log("Error disliking the answer:", err);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.reactionBtnWrapper}>
        <Button onClick={handleLike} icon={likeBtn.src} type="LIKE" />
        <h4 className={styles.votes}>{netScoreLikes}</h4>
        <Button onClick={handleDislike} icon={dislikeBtn.src} type="DISLIKE" />
      </div>

      <div className={styles.answerContent}>
        <p>{answerText}</p>
        <div className={styles.userDateWrapper}>
          <h5>{userName}</h5>
          <h5>{formattedDate}</h5>
        </div>
      </div>

      {isUserLoggedIn && loggedInUserId === userId && (
        <Button
          title="Delete"
          // onClick={deleteAnswer}
          onClick={() => setModalOpen(true)}
          type="DANGER"
        />
      )}

      {message && <p className={styles.error}>{message}</p>}

      {isModalOpen && (
        <Modal
          text={
            isDeleted
              ? "The answer has been successfully deleted."
              : "Are you sure you want to delete your answer?"
          }
          onConfirm={
            !isDeleted ? () => deleteAnswer(id) : () => setModalOpen(false)
          }
          onCancel={() => setModalOpen(false)}
          isDeleted={isDeleted}
        />
      )}
    </div>
  );
};

export default Answer;
