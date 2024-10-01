import SpinnerBtn from "../SpinnerBtn/SpinnerBtn";
import styles from "./styles.module.css";
import { ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  title?: string;
  isLoading: boolean;
  isActive: boolean;
  type?: string;
  icon?: ReactNode;
};

const Button = ({
  onClick,
  title,
  isLoading,
  type,
  isActive,
  icon,
}: ButtonProps) => {
  return (
    //   <button
    //     className={`${styles.main} ${type === "DANGER" && styles.danger}  ${
    //       type === "SIGNOUT" && styles.signOut
    //     }`}
    //     onClick={onClick}
    //   >
    //     {isLoading ? <SpinnerBtn /> : <>{title}</>}
    //   </button>
    // );

    <button
      className={`
      ${styles.main} 
      ${type === "DANGER" && styles.danger} 
      ${type === "SIGNOUT" && styles.signOut}
      ${type === "FILTER" && styles.signOut}
      ${type === "LIKE" && (isActive ? styles.active : styles.likeButton)} 
      ${type === "DISLIKE" && (isActive ? styles.active : styles.dislikeButton)}
      
    `}
      onClick={onClick}
      disabled={isActive && (type === "LIKE" || type === "DISLIKE")}
    >
      {isLoading ? (
        <SpinnerBtn />
      ) : (
        <>
          {icon && <img src={icon} alt="icon" className={styles.icon} />}
          {title && <span>{title}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
