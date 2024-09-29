import styles from "./styles.module.css";

type LikeDislikeButtonProps = {
  onClick: () => void;
  title: string;
  isActive: boolean;
  //   type?: string;
  type: "like" | "dislike";
};

// go back to this
// maybe reuser the other button, style logic
const LikeDislikeButton = ({
  onClick,
  title,
  isActive,
  type,
}: LikeDislikeButtonProps) => {
  return (
    <button
      className={`${styles.main} ${isActive ? styles.active : ""} ${
        type === "like" ? styles.likeButton : styles.dislikeButton
      }`}
      onClick={onClick}
      disabled={isActive}
    >
      {title}
    </button>
  );
};

export default LikeDislikeButton;

// const Button = ({ onClick, title, isLoading, type }: ButtonProps) => {
//   return (
//     <button
//       className={`${styles.main} ${type === "DANGER" && styles.danger}  ${
//         type === "SIGNOUT" && styles.signOut
//       }`}
//       onClick={onClick}
//     >
//       {isLoading ? <Spinner /> : <>{title}</>}
//     </button>
//   );
// };
