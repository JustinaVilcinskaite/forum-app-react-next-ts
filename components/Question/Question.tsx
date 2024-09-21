import styles from "./styles.module.css";

// pass the Question object to type Props?

type QuestionProps = {
  //   id: string;
  // tite:string;
  questionText: string;
  date: string;
  //   question: Question;
};

// TODO: delete question functionality
// Answer question functionality
// Question and QuestionCard very similar/reuse?

const Question = ({ questionText, date }: QuestionProps) => {
  const dateObj = new Date(date);

  const formattedDate = dateObj.toLocaleDateString();

  return (
    <div className={styles.main}>
      <p>{questionText}</p>
      <h5>{formattedDate}</h5>
    </div>
  );
};

export default Question;
