import SpinnerBtn from "../SpinnerBtn/SpinnerBtn";
import styles from "./styles.module.css";
import { ReactNode } from "react";

type ButtonProps = {
  onClick: () => void;
  title?: string;
  isLoading?: boolean;
  type?: string;
  icon?: ReactNode;
};

const Button = ({ onClick, title, isLoading, type, icon }: ButtonProps) => {
  return (
    <button
      className={`
      ${styles.main} 
      ${type === "DANGER" && styles.danger} 
      ${type === "FILTER" && styles.filter}
      ${type === "LOGOUT" && styles.logout}
      ${type === "VOTE" && styles.likeDislikeBtn} 
      ${type === "NEUTRAL" && styles.neutral} 
    `}
      onClick={onClick}
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
