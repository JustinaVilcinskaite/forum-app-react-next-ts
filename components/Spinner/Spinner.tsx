import styles from "./styles.module.css";

const Spinner = () => {
  return <span className={styles.loader}></span>;
};

export default Spinner;

// import styles from "./styles.module.css";

// type SpinnerProps = {
//   type?: string;
// };

// const Spinner = ({ type }: SpinnerProps) => {
//   return (
//     <span
//       className={`${styles.loader} ${type === "BUTTON" && styles.btnLoader}`}
//     ></span>
//   );
// };

// export default Spinner;
