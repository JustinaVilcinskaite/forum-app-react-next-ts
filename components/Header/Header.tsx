import styles from "./styles.module.css";
import Link from "next/link";
import { useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Navbar from "../NavBar/NavBar";
import burgerBtn from "../../assets/burger-btn.svg";
import Modal from "../Modal/Modal";

import { ReactNode } from "react";

type HeaderProps = {
  websiteTitle: string;
  isUserLoggedIn: boolean;
  icon: ReactNode;
};

const Header = ({ websiteTitle, isUserLoggedIn, icon }: HeaderProps) => {
  const [isShowOverlay, setShowOverlay] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isActionComplete, setActionComplete] = useState(false);
  const router = useRouter();

  const logoutUser = async () => {
    try {
      cookie.remove(process.env.JWT_KEY as string);
      setActionComplete(true);
      setTimeout(() => {
        setModalOpen(false);
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  return (
    <>
      <div className={`${isShowOverlay && "no-scroll"}`}>
        <header
          className={`${styles.main} ${isShowOverlay && styles.fixedHeader}`}
        >
          <div className={styles.logoTitleWrapper}>
            <img src={icon} alt="forum logo" className={styles.logo} />
            <Link href="/">{websiteTitle}</Link>
          </div>

          <div className={styles.rightHandSection}>
            <Navbar
              onClick={() => setModalOpen(true)}
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
              onClick={() => setModalOpen(true)}
              isUserLoggedIn={isUserLoggedIn}
              isInOverlay={true}
            />
          </div>
        </header>

        {isModalOpen && (
          <Modal
            text={
              isActionComplete
                ? "You have been successfully logged out."
                : "Are you sure you want to log out?"
            }
            onConfirm={
              !isActionComplete ? logoutUser : () => setModalOpen(false)
            }
            onCancel={() => setModalOpen(false)}
            isActionComplete={isActionComplete}
          />
        )}
      </div>
    </>
  );
};

export default Header;
