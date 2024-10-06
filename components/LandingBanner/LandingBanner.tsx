import styles from "./styles.module.css";

const LandingBanner = () => {
  return (
    <div className={styles.main}>
      <h1>WELCOME TO THE FORUM!</h1>
      <h2>Where questions and answers connect the dots.</h2>
      <div className={styles.animation}></div>
    </div>
  );
};

export default LandingBanner;
