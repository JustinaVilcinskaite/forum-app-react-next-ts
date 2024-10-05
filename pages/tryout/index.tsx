import PageTemplate from "../../components/PageTemplate/PageTemplate";
import styles from "./styles.module.css";

const MainPage = () => {
  return (
    <PageTemplate>
      <div className={styles.main}>
        <h1>WELCOME TO THE FORUM APP!</h1>
        <h2>Where questions and answers connect the dots.</h2>

        <div className={styles.loader}></div>
      </div>
    </PageTemplate>
  );
};

export default MainPage;
