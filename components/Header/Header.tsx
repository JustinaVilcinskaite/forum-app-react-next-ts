import styles from "./styles.module.css";
import Link from "next/link";
import { useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Navbar from "../NavBar/NavBar";
import burgerBtn from "../../assets/burger-btn.svg";
import { ReactNode } from "react";

type HeaderProps = {
  websiteTitle: string;
  isUserLoggedIn: boolean;
  icon: ReactNode;
};

const Header = ({ websiteTitle, isUserLoggedIn, icon }: HeaderProps) => {
  const [isShowOverlay, setShowOverlay] = useState(false);
  const router = useRouter();

  const signOutUser = () => {
    cookie.remove(process.env.JWT_KEY as string);
    router.push("/login");
  };

  return (
    <>
      <div className={`${isShowOverlay && "no-scroll"}`}>
        <header
          className={`${styles.main} ${isShowOverlay && styles.fixedHeader}`}
        >
          <div className={styles.logoTitleWrapper}>
            <img src={icon} alt="icon" className={styles.icon} />
            <Link href="/">{websiteTitle}</Link>
          </div>

          <div className={styles.rightHandSection}>
            <Navbar
              onClick={signOutUser}
              isUserLoggedIn={isUserLoggedIn}
              isInOverlay={false}
            />
            <button
              className={styles.burgerBtn}
              onClick={() => setShowOverlay(!isShowOverlay)}
            >
              <img src={burgerBtn.src} alt="menu button" />
            </button>
          </div>

          <div
            className={`${styles.overlay} ${
              isShowOverlay && styles.showOverlay
            }`}
          >
            <Navbar
              onClick={signOutUser}
              isUserLoggedIn={isUserLoggedIn}
              isInOverlay={true}
            />
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
