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

import styles from "./styles.module.css";
import LikeDislikeButton from "../LikeDislikeButton/LikeDislikeButton";
import cookie from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

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
};

// TODO: delete answer functionality

const Answer = ({
  id,
  answerText,
  date,
  gainedLikesNumber,
  userId,
  loggedInUserId,
  isUserLoggedIn,
}: AnswerProps) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString();

  // const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  // const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  const [netScoreLikes, setNetScoreLikes] = useState(gainedLikesNumber);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const [message, setMessage] = useState("");

  const jwt = cookie.get(process.env.JWT_KEY as string);

  // validation

  // const validateUser = async () => {
  //   try {
  //     const headers = {
  //       authorization: jwt,
  //     };

  //     const response = await axios.get(
  //       `${process.env.SERVER_URL}/login/validate`,
  //       { headers }
  //     );

  //     if (response.status === 200) {
  //       setUserLoggedIn(true);
  //       setLoggedInUserId(response.data.userId);
  //     }
  //   } catch (err) {
  //     console.log("Error in validation:", err);
  //   }
  // };

  // useEffect(() => {
  //   validateUser();
  // }, []);

  const deleteAnswer = async () => {
    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.delete(
        `${process.env.SERVER_URL}/answers/${id}`,
        {
          headers,
        }
      );

      if (response.status === 200) {
        console.log("deleted");
      }
    } catch (err) {
      console.log("Error during answer deletion:", err);
    }
  };

  // Handle Like
  const handleLike = async () => {
    if (!isUserLoggedIn) {
      setMessage("You must be logged in to like!");
      return;
    }

    if (hasLiked) {
      setMessage("You have already liked this answer!");
      return;
    }

    setNetScoreLikes((prevState) => prevState + 1);
    setHasLiked(true);
    setHasDisliked(false);

    try {
      const headers = {
        authorization: jwt,
      };

      const response = await axios.post(
        `${process.env.SERVER_URL}/answers/${id}/like`,
        {},
        { headers }
      );

      if (response.status !== 200) {
        throw new Error("Failed to like the answer");
      }
    } catch (err) {
      // Revert the optimistic UI update if there's an error
      setNetScoreLikes((prevState) => prevState - 1);
      setHasLiked(false);
      console.log("Error liking the answer:", err);
    }
  };

  const handleDislike = async () => {
    if (!isUserLoggedIn) {
      setMessage("You must be logged in to dislike!");
      return;
    }

    if (hasDisliked) {
      setMessage("You have already disliked this answer!");
      return;
    }

    // Optimistic UI update
    setNetScoreLikes((prevState) => prevState - 1);
    setHasLiked(false);
    setHasDisliked(true);

    try {
      const headers = {
        authorization: jwt,
      };

      console.log("Disliking answer:", id);

      const response = await axios.post(
        `${process.env.SERVER_URL}/answers/${id}/dislike`,
        {},
        { headers }
      );

      console.log(response);

      if (response.status !== 200) {
        throw new Error("Failed to dislike the answer");
      }
    } catch (err) {
      // Revert the optimistic UI update if there's an error
      setNetScoreLikes((prevState) => prevState + 1);
      setHasDisliked(false);
      console.log("Error disliking the answer:", err);
    }
  };

  return (
    <div className={styles.main}>
      <p>{answerText}</p>
      <h5>{formattedDate}</h5>

      {isUserLoggedIn && loggedInUserId === userId && (
        <Button
          title="Delete"
          onClick={() => deleteAnswer()}
          isLoading={false}
          type="DANGER"
        />
      )}

      <div className={styles.btnWrapper}>
        <LikeDislikeButton
          onClick={handleLike}
          title="👍"
          isActive={false}
          type="like"
        />

        <div className={styles.votes}>{netScoreLikes}</div>

        <LikeDislikeButton
          onClick={handleDislike}
          title="👎"
          isActive={false}
          type="dislike"
        />
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Answer;
