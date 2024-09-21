import styles from "./styles.module.css";
import { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// TODO: user validation

type PageTemplateProps = {
  children: ReactNode;
};

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <Header logo="Forum logo" />
      <div className={styles.main}>{children}</div>
      <Footer copyrightText="&copy; Forum" />
    </div>
  );
};

export default PageTemplate;
