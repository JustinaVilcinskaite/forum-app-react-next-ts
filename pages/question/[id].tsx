import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// change QuestionProp name
import { Question as QuestionProp } from "../../types/question";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import QuestionFullView from "../../components/QuestionFullView/QuestionFullView";
import { fetchQuestionWithAnswers as fetchQuestionWithAnswersApi } from "../../apiCalls/answer";
// import axios from "axios";
import AnswersWrapper from "../../components/AnswerWrapper/AnswerWrapper";
import AnswerForm from "../../components/AnswerForm/AnswerForm";
import { validateUser as validateUserApi } from "../../apiCalls/user";

const QuestionWithAnswersPage = () => {
  //?
  const [question, setQuestion] = useState<QuestionProp | null>(null);
  // kodel taip pat nerasom?
  const [answers, setAnswers] = useState([]);

  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);

  const router = useRouter();

  const fetchQuestionWithAnswers = async (id: string) => {
    try {
      const response = await fetchQuestionWithAnswersApi(id);

      console.log(response.data);
      setQuestion(response.data.question);
      setAnswers(response.data.answers);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

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

  // problem? WHY?
  // useEffect(() => {
  //   router.query.id && fetchQuestionWithAnswers(router.query.id as string);
  // }, [router.query.id]);

  // perziureti sita gal cia nesamone darau bet veikia
  // infinite loop
  // useEffect(() => {
  //   router.query.id && fetchQuestionWithAnswers(router.query.id as string);
  // }, [answers]);

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
        />

        {/* ??????? */}
        <AnswerForm
          questionId={router.query.id as string}
          isUserLoggedIn={isUserLoggedIn}
        />
      </>
    </PageTemplate>
  );
};

export default QuestionWithAnswersPage;
