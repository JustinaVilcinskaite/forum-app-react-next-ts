import styles from "./styles.module.css";

type FooterProps = {
  copyrightText: string;
};

const Footer = ({ copyrightText }: FooterProps) => {
  return (
    <div className={styles.main}>
      <h4>{copyrightText}</h4>
    </div>
  );
};

export default Footer;
