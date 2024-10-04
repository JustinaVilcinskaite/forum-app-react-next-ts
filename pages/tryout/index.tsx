import PageTemplate from "../../components/PageTemplate/PageTemplate";
import styles from "./styles.module.css";

const MainPage = () => {
  return (
    <PageTemplate>
      <div className={styles.main}>
        <h1>WELCOME TO THE FORUM APP</h1>
        {/* <span></span> */}
        <div className={styles.loader}></div>
      </div>
    </PageTemplate>
  );
};

export default MainPage;
