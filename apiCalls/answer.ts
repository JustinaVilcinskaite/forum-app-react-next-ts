import axios from "axios";
import { getAuthHeaders } from "../utils/authHeaders";

// gal kitur perkelti
export const fetchQuestionWithAnswers = async (id: string) => {
  const response = await axios.get(
    `${process.env.SERVER_URL}/questions/${id}/answers`
  );

  return response;
};

export const deleteAnswer = async (id: string) => {
  const headers = getAuthHeaders();

  const response = await axios.delete(
    `${process.env.SERVER_URL}/answers/${id}`,
    {
      headers,
    }
  );

  return response;
};

export const postLikeAnswer = async (id: string) => {
  const headers = getAuthHeaders();

  const response = await axios.post(
    `${process.env.SERVER_URL}/answers/${id}/like`,
    {},
    { headers }
  );
  return response;
};

export const postDislikeAnswer = async (id: string) => {
  const headers = getAuthHeaders();

  const response = await axios.post(
    `${process.env.SERVER_URL}/answers/${id}/dislike`,
    {},
    { headers }
  );
  return response;
};

type PostAnswerProps = {
  answerText: string;
  questionId: string;
};
// ?
// type SumbitQuestionProps = {
//   question: Question;
// };

export const postAnswer = async ({
  answerText,
  questionId,
}: PostAnswerProps) => {
  const body = {
    answerText,
  };

  const headers = getAuthHeaders();

  const response = await axios.post(
    `${process.env.SERVER_URL}/questions/${questionId}/answers`,
    body,
    { headers }
  );

  return response;
};
