import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { Question } from "../../types/question";
import Spinner from "../Spinner/Spinner";

type QuestionsWrapperProps = {
  questions: Question[];
};

// TODO: fix the Spinner or create a new one

const QuestionsWrapper = ({ questions }: QuestionsWrapperProps) => {
  return (
    <div className={styles.main}>
      {questions ? (
        questions.length ? (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              questionTitle={question.questionTitle}
              questionText={question.questionText}
              date={question.date}
            />
          ))
        ) : (
          <h4>No questions available</h4>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default QuestionsWrapper;

// return (
//   <div className={styles.main}>
//     {questions ? (
//       questions.map((question) => {
//         return (
//           <QuestionCard
//             key={question.id}
//             id={question.id}
//             questionTitle={question.questionTitle}
//             questionText={question.questionText}
//             date={question.date}
//             // userId={question.userId}
//           />
//         );
//       })
//     ) : (
//       <Spinner />
//     )}
//   </div>
// );
// };

// return (
//   <div className={styles.main}>
//     {questions &&
//       questions.map((question) => {
//         return (
//           <QuestionCard
//             key={question.id}
//             id={question.id}
//             questionTitle={question.questionTitle}
//             questionText={question.questionText}
//             date={question.date}
//             // userId={question.userId}
//           />
//         );
//       })}
//   </div>
// );
