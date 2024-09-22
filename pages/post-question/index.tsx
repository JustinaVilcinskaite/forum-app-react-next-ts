import QuestionForm from "../../components/QuestionForm/QuestionForm";
import PageTemplate from "../../components/PageTemplate/PageTemplate";

const PostQuestionPage = () => {
  return (
    <>
      <PageTemplate requiresAuth={true}>
        <QuestionForm />
      </PageTemplate>
    </>
  );
};

export default PostQuestionPage;
