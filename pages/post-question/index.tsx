import QuestionForm from "../../components/QuestionForm/QuestionForm";
import PageTemplate from "../../components/PageTemplate/PageTemplate";

// const PostQuestionPage = () => {
//   return (
//     <>
//       <PageTemplate isProtected={true}>
//         <QuestionForm />
//       </PageTemplate>
//     </>
//   );
// };

const PostQuestionPage = () => {
  return (
    <>
      <PageTemplate>
        <QuestionForm />
      </PageTemplate>
    </>
  );
};

export default PostQuestionPage;
