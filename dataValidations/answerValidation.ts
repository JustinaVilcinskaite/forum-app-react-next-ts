type AnswerValidationParams = {
  answerText: string;
};

export const validateAnswer = ({ answerText }: AnswerValidationParams) => {
  if (!answerText) {
    return "Answer field can not be empty.";
  }
  if (answerText.length < 2) {
    return "Answer must be at least 2 characters long.";
  }

  return "";
};
