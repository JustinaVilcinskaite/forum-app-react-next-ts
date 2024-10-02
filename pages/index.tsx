import { useEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import QuestionsWrapper from "../components/QuestionsWrapper/QuestionsWrapper";
import QuestionControlBar from "../components/QuestionControlBar/QuestionControlBar";

import { Question } from "../types/question";
import { fetchQuestions as fetchQuestionsApi } from "../apiCalls/question";

const MainPage = () => {
  //
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<"all" | "answered" | "unanswered">(
    "all"
  );

  const fetchQuestions = async () => {
    try {
      const response = await fetchQuestionsApi();

      // istrinti console
      console.log(response.data.questions);
      setQuestions(response.data.questions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const getFilteredQuestions = () => {
    if (filter === "answered") return questions.filter((q) => q.isAnswered);
    if (filter === "unanswered") return questions.filter((q) => !q.isAnswered);
    return questions;
  };

  return (
    <PageTemplate>
      <QuestionControlBar
        filterAll={() => setFilter("all")}
        filterAnswered={() => setFilter("answered")}
        filterUnanswered={() => setFilter("unanswered")}
      />
      <QuestionsWrapper questions={getFilteredQuestions()} />
    </PageTemplate>
  );
};

export default MainPage;
