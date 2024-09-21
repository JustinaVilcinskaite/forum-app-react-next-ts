import { useEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import QuestionsWrapper from "../components/QuestionsWrapper/QuestionsWrapper";
import { Question } from "../types/question";
import axios from "axios";

const MainPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/questions`);

      console.log(response.data.questions);
      setQuestions(response.data.questions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <PageTemplate>
        <QuestionsWrapper questions={questions} />
      </PageTemplate>
    </>
  );
};

export default MainPage;
