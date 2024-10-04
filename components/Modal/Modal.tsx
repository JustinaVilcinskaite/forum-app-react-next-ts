import styles from "./styles.module.css";
import Button from "../Button/Button";

type ModalProps = {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleted: boolean;
};

const Modal = ({ text, onConfirm, onCancel, isDeleted }: ModalProps) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.main}>
        <button className={styles.closeBtn} onClick={onCancel}>
          X
        </button>

        <div className={styles.modalContentWrapper}>
          <h3>{text}</h3>
          {!isDeleted && (
            <div className={styles.modalButtons}>
              <Button
                isActive={false}
                title="Yes"
                onClick={onConfirm}
                isLoading={false}
                type="DANGER"
              />

              <Button
                title="Cancel"
                onClick={onCancel}
                isLoading={false}
                isActive={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
