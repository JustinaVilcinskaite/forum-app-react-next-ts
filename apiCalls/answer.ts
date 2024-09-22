import axios from "axios";

export const fetchQuestionWithAnswers = async (id: string) => {
  const response = await axios.get(
    `${process.env.SERVER_URL}/questions/${id}/answers`
  );

  return response;
};
