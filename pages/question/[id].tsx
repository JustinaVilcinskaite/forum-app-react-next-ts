import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Question } from "../../types/question";
import { Answer } from "../../types/answer";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import QuestionFullView from "../../components/QuestionFullView/QuestionFullView";
import { fetchQuestionWithAnswers as fetchQuestionWithAnswersApi } from "../../apiCalls/answer";
import AnswersWrapper from "../../components/AnswerWrapper/AnswerWrapper";
import AnswerForm from "../../components/AnswerForm/AnswerForm";
import { validateUser as validateUserApi } from "../../apiCalls/user";

const QuestionWithAnswersPage = () => {
  //?
  const [question, setQuestion] = useState<Question | null>(null);
  // const [answers, setAnswers] = useState([]);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  const router = useRouter();

  const fetchQuestionWithAnswers = async (id: string) => {
    try {
      const response = await fetchQuestionWithAnswersApi(id);

      setQuestion(response.data.question);
      setAnswers(response.data.answers);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  // ar nepertekline validacija like/dislike ir postAnswer setLoggedInUserId(response.data.userId);
  const validateUser = async () => {
    try {
      const response = await validateUserApi();

      if (response.status === 200) {
        setUserLoggedIn(true);
        setLoggedInUserId(response.data.userId);
      }
    } catch (err) {
      console.log("Error in validation:", err);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchQuestionWithAnswers(router.query.id as string);
      validateUser();
    }
  }, [router.query.id]);

  // useEffect(() => {
  //   router.query.id && fetchQuestionWithAnswers(router.query.id as string);
  //   validateUser();
  // }, [router.query.id]);

  // infinite loop??
  // useEffect(() => {
  //   router.query.id && fetchQuestionWithAnswers(router.query.id as string);
  // }, [answers]);

  // Spinner?

  return (
    <PageTemplate>
      <>
        {question && (
          <QuestionFullView
            id={question.id}
            questionTitle={question.questionTitle}
            questionText={question.questionText}
            date={question.date}
            // why userId
            userId={question.userId}
            loggedInUserId={loggedInUserId}
            isUserLoggedIn={isUserLoggedIn}
          />
        )}
        <AnswersWrapper
          answers={answers}
          loggedInUserId={loggedInUserId}
          isUserLoggedIn={isUserLoggedIn}
          refetchData={() =>
            fetchQuestionWithAnswers(router.query.id as string)
          }
        />

        {/* ??????? */}
        {/* problema */}
        <AnswerForm
          // questionId={router.query.id as string}
          isUserLoggedIn={isUserLoggedIn}
          refetchData={() =>
            fetchQuestionWithAnswers(router.query.id as string)
          }
        />
      </>
    </PageTemplate>
  );
};

export default QuestionWithAnswersPage;
