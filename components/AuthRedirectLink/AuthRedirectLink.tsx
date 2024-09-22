import styles from "./styles.module.css";
import Link from "next/link";

type AuthRedirectLinkProps = {
  text: string;
  linkText: string;
  href: string;
};

const AuthRedirectLink = ({ text, linkText, href }: AuthRedirectLinkProps) => {
  return (
    <div className={styles.main}>
      <h5>
        {text}
        <Link href={href} className={styles.linkText}>
          {linkText}
        </Link>
      </h5>
    </div>
  );
};

export default AuthRedirectLink;
