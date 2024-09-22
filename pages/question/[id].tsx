import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// change QuestionProp name
import { Question as QuestionProp } from "../../types/question";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import Question from "../../components/Question/Question";
import { fetchQuestionWithAnswers as fetchQuestionWithAnswersApi } from "../../apiCalls/answer";
// import axios from "axios";
import AnswersWrapper from "../../components/AnswerWrapper/AnswerWrapper";

const QuestionWithAnswersPage = () => {
  //?
  const [question, setQuestion] = useState<QuestionProp | null>(null);
  const [answers, setAnswers] = useState([]);

  const router = useRouter();

  // id: string
  const fetchQuestionWithAnswers = async (id: string) => {
    try {
      //   const response = await axios.get(
      //     `${process.env.SERVER_URL}/questions/${router.query.id}/answers`
      //   );

      const response = await fetchQuestionWithAnswersApi(id);

      console.log(response.data);
      setQuestion(response.data.question);
      setAnswers(response.data.answers);
    } catch (err) {
      console.error("error", err);
    }
  };

  // problem?
  useEffect(() => {
    router.query.id && fetchQuestionWithAnswers(router.query.id as string);
  }, [router.query.id]);

  return (
    <PageTemplate>
      <>
        {question && (
          <Question
            // id={question.id}
            questionTitle={question.questionTitle}
            questionText={question.questionText}
            date={question.date}
          />
        )}
        <AnswersWrapper answers={answers} />
      </>
    </PageTemplate>
  );
};

export default QuestionWithAnswersPage;
