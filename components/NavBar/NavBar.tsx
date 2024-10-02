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
        {!shouldHideLinks && (
          <>
            <li>
              <Link href="/">Questions</Link>
            </li>
            {isUserLoggedIn ? (
              <li>
                <Button
                  isActive={false}
                  title="Log out"
                  onClick={onClick}
                  isLoading={false}
                  type="SIGNOUT"
                />
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login">Log in</Link>
                </li>
                <li>
                  <Link href="/signup">Sign up</Link>
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
