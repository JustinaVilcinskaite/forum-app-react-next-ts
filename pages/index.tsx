import { useEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import QuestionsWrapper from "../components/QuestionsWrapper/QuestionsWrapper";

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
  const handleFilterChange = (filter: string) => {
    setFilter(filter as "all" | "answered" | "unanswered");
  };

  const filteredQuestions = questions.filter((question) => {
    if (filter === "all") return true;
    if (filter === "answered") return question.isAnswered;
    if (filter === "unanswered") return !question.isAnswered;
  });

  return (
    <PageTemplate onClick={handleFilterChange}>
      <QuestionsWrapper questions={filteredQuestions} />
    </PageTemplate>
  );
};

export default MainPage;
