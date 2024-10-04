export type Answer = {
  id: string;
  answerText: string;
  date: string;
  gainedLikesNumber: number;
  likedBy: string[];
  dislikedBy: string[];
  questionId: string;
  userId: string;
  userName: string;
};
