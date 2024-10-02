import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { Question } from "../../types/question";
import SpinnerMain from "../SpinnerMain/SpinnerMain";

type QuestionsWrapperProps = {
  questions: Question[];
};

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
          <h4 className={styles.message}>No questions available</h4>
        )
      ) : (
        <SpinnerMain />
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
