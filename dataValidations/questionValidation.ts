type QuestionValidationParams = {
  questionTitle: string;
  questionText: string;
};

export const validateQuestion = ({
  questionTitle,
  questionText,
}: QuestionValidationParams) => {
  if (!questionTitle || !questionText) {
    return "All fields are required.";
  }

  if (questionTitle.length < 5) {
    return "Question title must be at least 5 characters long.";
  }

  if (questionTitle.length > 50) {
    return "Question title must be at most 50 characters long.";
  }

  if (questionText.length < 20) {
    return "Question text must be at least 20 characters long.";
  }

  return "";
};
