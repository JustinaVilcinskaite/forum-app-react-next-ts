import axios from "axios";
import { getAuthHeaders } from "../utils/api";

export const fetchQuestions = async () => {
  const response = await axios.get(`${process.env.SERVER_URL}/questions`);

  return response;
};

// ?
type SumbitQuestionProps = {
  questionTitle: string;
  questionText: string;
};
// ?
// type SumbitQuestionProps = {
//   question: Question;
// };

export const submitQuestion = async ({
  questionTitle,
  questionText,
}: SumbitQuestionProps) => {
  const body = {
    questionTitle: questionTitle,
    questionText: questionText,
  };

  const headers = getAuthHeaders();

  const response = await axios.post(
    `${process.env.SERVER_URL}/questions`,
    body,
    { headers }
  );
  return response;
};

export const deleteQuestion = async (id: string) => {
  const headers = getAuthHeaders();

  const response = await axios.delete(
    `${process.env.SERVER_URL}/questions/${id}`,
    {
      headers,
    }
  );

  return response;
};
