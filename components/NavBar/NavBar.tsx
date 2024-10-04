import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./styles.module.css";
import Button from "../Button/Button";

type NavbarProps = {
  onClick: () => void;
  isUserLoggedIn: boolean;
  isInOverlay: boolean;
};

const Navbar = ({ onClick, isUserLoggedIn, isInOverlay }: NavbarProps) => {
  const router = useRouter();

  const hiddenPaths = ["/login", "/signup"];
  const shouldHideLinks = hiddenPaths.includes(router.pathname);

  return (
    <nav className={`${styles.main} ${isInOverlay && styles.overlayNavbar}`}>
      <ul>
        <li>
          <Link href="/">Questions</Link>
        </li>
        {isUserLoggedIn ? (
          <>
            <li>
              <Button title="Log out" onClick={onClick} type="LOGOUT" />
            </li>
          </>
        ) : (
          <>
            {!shouldHideLinks && (
              <>
                <li>
                  <Link href="/login" className={styles.circleBtn}>
                    Log in
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className={styles.circleBtn}>
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
