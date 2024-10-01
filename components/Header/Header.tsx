import styles from "./styles.module.css";
import Link from "next/link";
import { useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Navbar from "../NavBar/NavBar";
import burgerBtn from "../../assets/burger-btn.svg";

type HeaderProps = {
  logo: string;
  isUserLoggedIn: boolean;
};

const Header = ({ logo, isUserLoggedIn }: HeaderProps) => {
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
          <Link href="/" className={styles.logo}>
            {logo}
          </Link>

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
