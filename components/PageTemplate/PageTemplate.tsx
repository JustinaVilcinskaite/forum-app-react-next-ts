import styles from "./styles.module.css";
import { ReactNode, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useRouter } from "next/router";
import { validateUser as validateUserApi } from "../../apiCalls/user";
import Link from "next/link";
// TODO: user validation
// requiresAuth?

type PageTemplateProps = {
  children: ReactNode;
  requiresAuth?: boolean;
};

const PageTemplate = ({
  children,
  requiresAuth = false,
}: PageTemplateProps) => {
  // const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const router = useRouter();

  const validateUser = async () => {
    try {
      const response = await validateUserApi();

      if (response.status !== 200 && requiresAuth) {
        router.push("/login");
      }
    } catch (err) {
      router.push("/login");
      console.log(err);
      if (requiresAuth) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    if (requiresAuth) {
      validateUser();
    }
  }, []);

  // useEffect(() => {
  //   validateUser();
  // }, []);

  // kazkaip keistai funkcionuoja
  return (
    <div className={styles.wrapper}>
      <Header logo="Forum logo" />
      <Link href="/post-question" className={styles.askQuestionLink}>
        Ask Question
      </Link>
      <div className={styles.main}>{children}</div>
      <Footer copyrightText="&copy; Forum" />
    </div>
  );
};

export default PageTemplate;
