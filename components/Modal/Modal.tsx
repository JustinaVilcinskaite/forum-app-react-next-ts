import styles from "./styles.module.css";
import Button from "../Button/Button";

type ModalProps = {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  isActionComplete: boolean;
};

const Modal = ({ text, onConfirm, onCancel, isActionComplete }: ModalProps) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.main}>
        <button className={styles.closeBtn} onClick={onCancel}>
          X
        </button>

        <div className={styles.modalContentWrapper}>
          <h3>{text}</h3>
          {!isActionComplete && (
            <div className={styles.modalButtons}>
              <Button title="Yes" onClick={onConfirm} type="DANGER" />

              <Button title="Cancel" onClick={onCancel} type="NEUTRAL" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
