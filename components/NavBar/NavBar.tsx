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
  const shouldHideAuthLinks = hiddenPaths.includes(router.pathname);

  return (
    <nav className={`${styles.main} ${isInOverlay && styles.overlayNavbar}`}>
      <ul>
        <li>
          <Link href="/">Questions</Link>
        </li>
        {isUserLoggedIn ? (
          <>
            <li>
              <Button
                isActive={false}
                title="Sign out"
                onClick={onClick}
                isLoading={false}
                type="SIGNOUT"
              />
            </li>
          </>
        ) : (
          <>
            {!shouldHideAuthLinks && (
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
