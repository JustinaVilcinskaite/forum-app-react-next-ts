import { useEffect, useState } from "react";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import QuestionsWrapper from "../../components/QuestionsWrapper/QuestionsWrapper";
import { Question } from "../../types/question";
import { fetchQuestions as fetchQuestionsApi } from "../../apiCalls/question";
import QuestionNavBar from "../../components/QuestionNavBar/QuestionNavBar";
import QuestionFilterBar from "../../components/QuestionFilterBar/QuestionFilterBar";
import styles from "./styles.module.css";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const [filter, setFilter] = useState<"all" | "answered" | "unanswered">(
    "all"
  );

  const fetchQuestions = async () => {
    try {
      const response = await fetchQuestionsApi();
      console.log(response.data);
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
      <div className={styles.controlBarWrapper}>
        <QuestionFilterBar
          filterAll={() => setFilter("all")}
          filterAnswered={() => setFilter("answered")}
          filterUnanswered={() => setFilter("unanswered")}
        />
        <QuestionNavBar />
      </div>

      <QuestionsWrapper questions={getFilteredQuestions()} />
    </PageTemplate>
  );
};

export default QuestionsPage;
