import styles from "./styles.module.css";
import Link from "next/link";

// TODO: navbar, header functionality

type HeaderProps = {
  logo: string;
};

const Header = ({ logo }: HeaderProps) => {
  return (
    <header className={styles.main}>
      <Link href="/" className={styles.logo}>
        {logo}
      </Link>
    </header>
  );
};

export default Header;
