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
  // del sitos vietos dar pagalvoti
  // const hiddenPaths = ["/login", "/signup", "/post-question"];
  // const displayAskQuestionLink = !hiddenPaths.includes(router.pathname);

  // const validateUser = async () => {
  //   try {
  //     const response = await validateUserApi();
  //     if (response.status !== 200 && isProtected) {
  //       router.push("/login");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     if (isProtected) {
  //       router.push("/login");
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (isProtected) {
  //     validateUser();
  //   }
  // }, [isProtected]);

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

      {/* <div className={styles.bar}>
        <Bar1 />
        <Bar2 />
      </div> */}

      <div className={styles.main}>{children}</div>
      <Footer copyrightText="&copy; Forum" />
    </div>
  );
};

export default PageTemplate;

// import { useRouter } from "next/router";
// import { validateUser as validateUserApi } from "../../apiCalls/user";
// import Link from "next/link";
// TODO: user validation
// requiresAuth?

// padarysiu validacija visur atskirai

// type PageTemplateProps = {
//   children: ReactNode;
//   isProtected?: boolean;
// };

// const PageTemplate = ({ children, isProtected = false }: PageTemplateProps) => {
//   // const [isUserLoggedIn, setUserLoggedIn] = useState(false);

//   const router = useRouter();

//   const validateUser = async () => {
//     try {
//       const response = await validateUserApi();

//       if (response.status !== 200 && isProtected) {
//         router.push("/login");
//       }
//       // fix this
//     } catch (err) {
//       // router.push("/login");
//       console.log(err);
//       if (isProtected) {
//         router.push("/login");
//       }
//     }
//   };

//   useEffect(() => {
//     if (isProtected) {
//       validateUser();
//     }
//   }, [isProtected]);

//   // useEffect(() => {
//   //   validateUser();
//   // }, []);

//
//   return (
//     <div className={styles.wrapper}>
//       <Header logo="Forum logo" />
//       {/* <Link href="/post-question" className={styles.askQuestionLink}>
//         Ask Question
//       </Link> */}
//       <div className={styles.main}>{children}</div>
//       <Footer copyrightText="&copy; Forum" />
//     </div>
//   );
// };

// export default PageTemplate;

// type PageTemplateProps = {
//   children: ReactNode;
// };

// const PageTemplate = ({ children }: PageTemplateProps) => {
// const [isUserLoggedIn, setUserLoggedIn] = useState(false);

// const router = useRouter();

// const validateUser = async () => {
//   try {
//     const response = await validateUserApi();

//     if (response.status !== 200) {
//       router.push("/login");
//     }

//     // setUserLoggedIn(true);
//   } catch (err) {
//     router.push("/login");
//     console.log(err);
//   }
// };

// useEffect(() => {
//   validateUser();
// }, []);

// useEffect(() => {
//   // Check if the current route is login or sign-up
//   if (
//     router.asPath !== "/login" &&
//     router.asPath !== "/signup" &&
//     router.asPath !== "/"
//   ) {
//     validateUser();
//   }
//   // else {
//   //   setUserLoggedIn(false);
//   // }
// }, [router.asPath]);

// kazkaip keistai funkcionuoja
//   return (
//     <div className={styles.wrapper}>
//       <Header logo="Forum logo" />
//       {/* <Link href="/post-question" className={styles.askQuestionLink}>
//         Ask Question
//       </Link> */}
//       <div className={styles.main}>{children}</div>
//       <Footer copyrightText="&copy; Forum" />
//     </div>
//   );
// };

// export default PageTemplate;
