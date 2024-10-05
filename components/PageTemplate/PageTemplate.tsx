import styles from "./styles.module.css";
import { ReactNode } from "react";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useRouter } from "next/router";
import { validateUser as validateUserApi } from "../../apiCalls/user";
import forumLogo from "../../assets/forum-logo.svg";

type PageTemplateProps = {
  children: ReactNode;
  isProtected?: boolean;
};

const PageTemplate = ({ children, isProtected = false }: PageTemplateProps) => {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const router = useRouter();

  const validateUser = async () => {
    try {
      const response = await validateUserApi();

      if (response.status === 200) {
        setUserLoggedIn(true);
        return;
      }

      if (isProtected) {
        router.push("/login");
      }
    } catch (err) {
      console.log(err);

      if (isProtected) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    validateUser();
  }, [isProtected]);

  return (
    <div className={styles.wrapper}>
      <Header
        websiteTitle="Forum"
        icon={forumLogo.src}
        isUserLoggedIn={isUserLoggedIn}
      />

      <div className={styles.main}>{children}</div>
      <Footer copyrightText="&copy; Forum" />
    </div>
  );
};

export default PageTemplate;
