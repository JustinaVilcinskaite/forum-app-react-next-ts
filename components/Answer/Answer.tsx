import styles from "./styles.module.css";
import likeBtn from "../../assets/like-btn.svg";
import dislikeBtn from "../../assets/dislike-btn.svg";
import { useState } from "react";
import Button from "../Button/Button";
import { formatDate } from "../../utils/dateFormatter";
import {
  postDislikeAnswer,
  postLikeAnswer,
  deleteAnswer as deleteAnswerApi,
} from "../../apiCalls/answer";
import Modal from "../Modal/Modal";

type AnswerProps = {
  id: string;
  answerText: string;
  date: string;
  gainedLikesNumber: number;
  userId: string;
  loggedInUserId: string | null;
  isUserLoggedIn: boolean;
  userName: string;
  onRemoveAnswer: (answerId: string) => void;
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
  onRemoveAnswer,
}: AnswerProps) => {
  const [netScoreLikes, setNetScoreLikes] = useState(gainedLikesNumber);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isActionComplete, setActionComplete] = useState(false);
  const [message, setMessage] = useState("");

  const deleteAnswer = async (id: string) => {
    try {
      const response = await deleteAnswerApi(id);

      if (response.status === 200) {
        setActionComplete(true);
        setTimeout(() => {
          setModalOpen(false);
          onRemoveAnswer(id);
        }, 2000);
      }
    } catch (err) {
      console.log("Error deleting answer", err);
    }
  };

  const handleLike = async (id: string) => {
    if (!isUserLoggedIn) {
      setMessage("Log in to interact!");
      return;
    }
    try {
      const response = await postLikeAnswer(id);

      if (response.status === 200) {
        setNetScoreLikes(response.data.gainedLikesNumber);
      }
    } catch (err) {
      console.log("Error liking the answer", err);
    }
  };

  const handleDislike = async (id: string) => {
    if (!isUserLoggedIn) {
      setMessage("Log in to interact!");
      return;
    }
    try {
      const response = await postDislikeAnswer(id);

      if (response.status === 200) {
        setNetScoreLikes(response.data.gainedLikesNumber);
      }
    } catch (err) {
      console.log("Error disliking the answer", err);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.reactionBtnWrapper}>
        <Button onClick={() => handleLike(id)} icon={likeBtn.src} type="VOTE" />
        <h4 className={styles.votes}>{netScoreLikes}</h4>
        <Button
          onClick={() => handleDislike(id)}
          icon={dislikeBtn.src}
          type="VOTE"
        />
      </div>

      <div className={styles.answerContent}>
        <p>{answerText}</p>
        <div className={styles.userDateWrapper}>
          <h5>{userName}</h5>
          <h5>{formatDate(date)}</h5>
        </div>
      </div>

      {isUserLoggedIn && loggedInUserId === userId && (
        <Button
          title="Delete"
          onClick={() => setModalOpen(true)}
          type="DANGER"
        />
      )}

      {message && <p className={styles.error}>{message}</p>}

      {isModalOpen && (
        <Modal
          text={
            isActionComplete
              ? "The answer has been successfully deleted."
              : "Are you sure you want to delete your answer?"
          }
          onConfirm={
            !isActionComplete
              ? () => deleteAnswer(id)
              : () => setModalOpen(false)
          }
          onCancel={() => setModalOpen(false)}
          isActionComplete={isActionComplete}
        />
      )}
    </div>
  );
};

export default Answer;
