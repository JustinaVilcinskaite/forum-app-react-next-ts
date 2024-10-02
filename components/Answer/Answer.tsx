// import styles from "./styles.module.css";
// import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
// import cookie from "js-cookie";
// import axios from "axios";
// import { useEffect, useState } from "react";

// // pass the Answer object to type Props?
// // nesuprantu like ir dislike funcionavimo, veliau grziti

// type AnswerProps = {
//   id: string;
//   answerText: string;
//   date: string;
//   gainedLikesNumber: number;

//   // likedBy: string[];
//   // dislikedBy: string[];
// };

// // TODO: delete answer functionality

// const Answer = ({
//   id,
//   answerText,
//   date,
//   gainedLikesNumber,
// }: // likedBy,
// // dislikedBy,
// AnswerProps) => {
//   const dateObj = new Date(date);
//   const formattedDate = dateObj.toLocaleDateString();

//   const [isUserLoggedIn, setUserLoggedIn] = useState(false);

//   // pavadinimas
//   // const [netScoreLikes, setNetScoreLikes] = useState<number | null>(
//   //   gainedLikesNumber
//   // );

//   const [netScoreLikes, setNetScoreLikes] = useState(gainedLikesNumber);
//   const [hasLiked, setHasLiked] = useState(false);
//   const [hasDisliked, setHasDisliked] = useState(false);

//   const [message, setMessage] = useState("");

//   const jwt = cookie.get(process.env.JWT_KEY as string);

//   // validation

//   const validateUser = async () => {
//     try {
//       const headers = {
//         authorization: jwt,
//       };

//       const response = await axios.get(
//         `${process.env.SERVER_URL}/login/validate`,
//         { headers }
//       );

//       if (response.status === 200) {
//         setUserLoggedIn(true);
//       }
//     } catch (err) {
//       console.log("Error in validation:", err);
//     }
//   };

//   useEffect(() => {
//     validateUser();
//   }, []);

//   // const fetchNetScoreLikes = async () => {
//   //   try {
//   //     const response = await axios.get(
//   //       `${process.env.SERVER_URL}/answers/${id}/score`
//   //     );
//   //     if (response.status === 200) {
//   //       setNetScoreLikes(response.data.gainedLikesNumber); // Correctly update score on mount
//   //     }
//   //   } catch (err) {
//   //     console.log("Error fetching the net score:", err);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchNetScoreLikes(); // Fetch score when the component mounts
//   // }, [id]);

//   // Handle Like
//   const handleLike = async () => {
//     if (!isUserLoggedIn) {
//       setMessage("You must be logged in to like!");
//       return;
//     }

//     if (hasDisliked) {
//       alert("You have already disliked this answer!");
//       return;
//     }

//     try {
//       const headers = {
//         authorization: jwt,
//       };

//       const response = await axios.post(
//         `${process.env.SERVER_URL}/answers/${id}/like`,
//         {},
//         { headers }
//       );

//       setNetScoreLikes(netScoreLikes + 1);

//       if (response.status === 200) {
//         setHasLiked(true);
//         setHasDisliked(false);
//         // setNetScoreLikes(response.data.gainedLikesNumber);
//       }

//       // setHasLiked(true);
//       // setHasDisliked(false);
//     } catch (err) {
//       console.log("Error liking the answer:", err);
//       setNetScoreLikes(netScoreLikes - 1);
//     }
//   };

//   const handleDislike = async () => {
//     if (!isUserLoggedIn) {
//       setMessage("You must be logged in to dislike!");
//       return;
//     }

//     if (hasDisliked) {
//       setMessage("You have already disliked this answer!");
//       return;
//     }

//     try {
//       const headers = {
//         authorization: jwt,
//       };

//       console.log("Disliking answer:", id);

//       const response = await axios.post(
//         `${process.env.SERVER_URL}/answers/${id}/dislike`,
//         {},
//         { headers }
//       );

//       console.log(response);

//       setNetScoreLikes(netScoreLikes - 1);

//       if (response.status === 200) {
//         setHasLiked(false);
//         setHasDisliked(true);
//         // setNetScoreLikes(response.data.gainedLikesNumber);
//       }
//     } catch (err) {
//       console.log("Error disliking the answer:", err);
//       setNetScoreLikes(netScoreLikes - 1);
//     }
//   };

//   return (
//     <div className={styles.main}>
//       <p>{answerText}</p>
//       {/* <h5>{gainedLikesNumber}</h5> */}
//       <h5>{formattedDate}</h5>

//       <div className={styles.btnWrapper}>
//         <LikeDislikeButton
//           onClick={handleLike}
//           title="👍"
//           isActive={false}
//           type="like"
//         />

//         {/* <div className={styles.votes}>{netScoreLikes}</div> */}

//         {/* Add conditional rendering for netScoreLikes */}
//         {netScoreLikes !== null ? (
//           <div className={styles.votes}>{netScoreLikes} Votes</div>
//         ) : (
//           <div className={styles.votes}>Loading...</div>
//         )}

//         <LikeDislikeButton
//           onClick={handleDislike}
//           title="👎"
//           isActive={false}
//           type="dislike"
//         />
//       </div>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Answer;

// optimistic ui

// import styles from "./styles.module.css";
// import likeBtn from "../../assets/like-btn.svg";
// import dislikeBtn from "../../assets/dislike-btn.svg";

// import { useEffect, useState } from "react";
// import Button from "../Button/Button";
// import { deleteAnswer as deleteAnswerApi } from "../../apiCalls/answer";
// import { postLikeAnswer } from "../../apiCalls/answer";
// import { postDislikeAnswer } from "../../apiCalls/answer";

// // pass the Answer object to type Props?
// // nesuprantu like ir dislike funcionavimo, veliau grziti

// type AnswerProps = {
//   id: string;
//   answerText: string;
//   date: string;
//   gainedLikesNumber: number;
//   // questionId: string;
//   userId: string;
//   loggedInUserId: string | null;
//   isUserLoggedIn: boolean;
//   refetchData: () => void;
// };

// const Answer = ({
//   id,
//   answerText,
//   date,
//   gainedLikesNumber,
//   userId,
//   loggedInUserId,
//   isUserLoggedIn,
//   refetchData,
// }: AnswerProps) => {
//   const dateObj = new Date(date);
//   const formattedDate = dateObj.toLocaleDateString();

//   // ?
//   const [netScoreLikes, setNetScoreLikes] = useState(gainedLikesNumber);
//   const [hasLiked, setHasLiked] = useState(false);
//   const [hasDisliked, setHasDisliked] = useState(false);

//   const [message, setMessage] = useState("");

//   const deleteAnswer = async () => {
//     try {
//       const response = await deleteAnswerApi(id);

//       if (response.status === 200) {
//         refetchData();
//       }
//     } catch (err) {
//       console.log("Error deleting answer", err);
//     }
//   };

//   // pavadinimas?
//   // tvarkyti visa front end like/dislike funcionaluma
//   const handleLike = async () => {
//     try {
//       if (!isUserLoggedIn) {
//         setMessage("Log in to interact!");
//         return;
//       }

//       // gal nereikalinga
//       if (hasLiked) {
//         return;
//       }

//       setNetScoreLikes((prevState) => prevState + 1);
//       setHasLiked(true);
//       setHasDisliked(false);

//       const response = await postLikeAnswer(id);

//       // ?
//       if (response.status !== 200) {
//         throw new Error("Failed to like the answer");
//       }
//     } catch (err) {
//       setNetScoreLikes((prevState) => prevState - 1);
//       setHasLiked(false);
//       console.log("Error liking the answer:", err);
//     }
//   };

//   const handleDislike = async () => {
//     if (!isUserLoggedIn) {
//       setMessage("Log in to interact!");
//       return;
//     }

//     // gal nereikalinga
//     if (hasDisliked) {
//       return;
//     }

//     // Optimistic UI update
//     setNetScoreLikes((prevState) => prevState - 1);
//     setHasLiked(false);
//     setHasDisliked(true);

//     try {
//       const response = await postDislikeAnswer(id);

//       if (response.status !== 200) {
//         throw new Error("Failed to dislike the answer");
//       }
//     } catch (err) {
//       setNetScoreLikes((prevState) => prevState + 1);
//       setHasDisliked(false);
//       console.log("Error disliking the answer:", err);
//     }
//   };

//   return (
//     <div className={styles.main}>
//       <p>{answerText}</p>
//       <h5>{formattedDate}</h5>

//       {isUserLoggedIn && loggedInUserId === userId && (
//         <Button
//           isActive={false}
//           title="Delete"
//           onClick={() => deleteAnswer()}
//           isLoading={false}
//           type="DANGER"
//         />
//       )}

//       <div className={styles.btnWrapper}>
//         <Button
//           isActive={false}
//           onClick={handleLike}
//           icon={likeBtn.src}
//           type="LIKE"
//           isLoading={false}
//         />

//         <div className={styles.votes}>{netScoreLikes}</div>

//         <Button
//           isActive={false}
//           onClick={handleDislike}
//           icon={dislikeBtn.src}
//           type="DISLIKE"
//           isLoading={false}
//         />
//       </div>

//       <p>{message}</p>
//     </div>
//   );
// };

// export default Answer;

// ta gal normali

import styles from "./styles.module.css";
import likeBtn from "../../assets/like-btn.svg";
import dislikeBtn from "../../assets/dislike-btn.svg";

import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { deleteAnswer as deleteAnswerApi } from "../../apiCalls/answer";
import { postLikeAnswer } from "../../apiCalls/answer";
import { postDislikeAnswer } from "../../apiCalls/answer";
import axios from "axios";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

// pass the Answer object to type Props?
// nesuprantu like ir dislike funcionavimo, veliau grziti

type AnswerProps = {
  id: string;
  answerText: string;
  date: string;
  gainedLikesNumber: number;
  // questionId: string;
  userId: string;
  loggedInUserId: string | null;
  isUserLoggedIn: boolean;
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
  refetchData,
}: AnswerProps) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString();

  // ?
  const [netScoreLikes, setNetScoreLikes] = useState(gainedLikesNumber);
  // const [hasLiked, setHasLiked] = useState(false);
  // const [hasDisliked, setHasDisliked] = useState(false);

  const router = useRouter();

  const [message, setMessage] = useState("");

  // const deleteAnswer = async () => {
  //

  //   try {
  //     const response = await deleteAnswerApi(id);

  //     if (response.status === 200) {
  //       refetchData();
  //     }
  //   } catch (err) {
  //     console.log("Error deleting answer:", err);
  //   }
  // };

  // pagalvoti dar del sito
  const deleteAnswer = async () => {
    try {
      const response = await deleteAnswerApi(id);

      if (response.status === 200) {
        refetchData();
      }
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === 401) {
        setMessage("Your session has expired. Please log in again.");

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        console.log("Error deleting answer", err);
      }
    }
  };

  const fetchNetScore = async () => {
    try {
      const response = await axios.get(
        `${process.env.SERVER_URL}/answers/${id}/likes`
      );

      if (response.status === 200) {
        setNetScoreLikes(response.data.gainedLikesNumber);
      }
    } catch (err) {
      console.log("Error fetching net score:", err);
    }
  };

  // useEffect(() => {
  //   fetchNetScore();
  // }, [id]); // Dependency on gainedLikesNumber

  const handleLike = async () => {
    if (!isUserLoggedIn) {
      setMessage("Log in to interact!");
      return;
    }

    // if (hasLiked) {
    //   return;
    // }

    try {
      const response = await postLikeAnswer(id);

      if (response.status === 200) {
        await fetchNetScore();

        // setHasLiked(true);
        // setHasDisliked(false);
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

    // if (hasDisliked) {
    //   return;
    // }

    try {
      const response = await postDislikeAnswer(id);

      if (response.status === 200) {
        await fetchNetScore();
        // setNetScoreLikes(response.data.gainedLikesNumber);
        // setHasLiked(false);
        // setHasDisliked(true);
      }
    } catch (err) {
      console.log("Error disliking the answer:", err);
    }
  };

  // const handleLike = async () => {
  //   try {
  //     if (!isUserLoggedIn) {
  //       setMessage("Log in to interact!");
  //       return;
  //     }

  //     if (hasLiked) {
  //       // If already liked, do nothing
  //       return;
  //     }

  //     // Optimistic UI update
  //     setNetScoreLikes((prevState) => prevState + 1);
  //     setHasLiked(true);
  //     setHasDisliked(false); // Reset dislike if switching to like

  //     const response = await postLikeAnswer(id);

  //     // Error handling
  //     if (response.status !== 200) {
  //       throw new Error("Failed to like the answer");
  //     }
  //   } catch (err) {
  //     setNetScoreLikes((prevState) => prevState - 1); // Rollback
  //     setHasLiked(false);
  //     console.log("Error liking the answer:", err);
  //   }
  // };

  // const handleDislike = async () => {
  //   try {
  //     if (!isUserLoggedIn) {
  //       setMessage("Log in to interact!");
  //       return;
  //     }

  //     if (hasDisliked) {
  //       // If already disliked, do nothing
  //       return;
  //     }

  //     // Optimistic UI update
  //     setNetScoreLikes((prevState) => prevState - 1);
  //     setHasDisliked(true);
  //     setHasLiked(false); // Reset like if switching to dislike

  //     const response = await postDislikeAnswer(id);

  //     // Error handling
  //     if (response.status !== 200) {
  //       throw new Error("Failed to dislike the answer");
  //     }
  //   } catch (err) {
  //     setNetScoreLikes((prevState) => prevState + 1); // Rollback
  //     setHasDisliked(false);
  //     console.log("Error disliking the answer:", err);
  //   }
  // };

  return (
    <div className={styles.main}>
      <p>{answerText}</p>
      <h5>{formattedDate}</h5>

      {isUserLoggedIn && loggedInUserId === userId && (
        <Button
          isActive={false}
          title="Delete"
          onClick={deleteAnswer}
          isLoading={false}
          type="DANGER"
        />
      )}
      {/* <p>{message}</p> */}

      <div className={styles.btnWrapper}>
        <Button
          isActive={false}
          onClick={handleLike}
          icon={likeBtn.src}
          type="LIKE"
          isLoading={false}
        />

        <div className={styles.votes}>{netScoreLikes}</div>

        <Button
          isActive={false}
          onClick={handleDislike}
          icon={dislikeBtn.src}
          type="DISLIKE"
          isLoading={false}
        />
      </div>
      {/* conditional rendering */}
      <p>{message}</p>
    </div>
  );
};

export default Answer;
