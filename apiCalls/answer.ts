import axios from "axios";
import { getAuthHeaders } from "../utils/authHeaders";

type PostAnswerProps = {
  answerText: string;
  questionId: string;
};

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

// gal prie klausimu perkelti
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

export const fetchNetScore = async (id: string) => {
  const response = await axios.get(
    `${process.env.SERVER_URL}/answers/${id}/net-score`
  );

  return response;
};
