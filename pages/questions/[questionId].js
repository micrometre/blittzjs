import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout";
import getQuestion from "app/questions/queries/getQuestion";
import deleteQuestion from "app/questions/mutations/deleteQuestion";
export const Question = () => {
  const router = useRouter();
  const questionId = useParam("questionId", "number");
  const [deleteQuestionMutation] = useMutation(deleteQuestion);
  const [question] = useQuery(getQuestion, {
    id: questionId,
  });
  return (
    <>
      <Head>
        <title>Question {question.id}</title>
      </Head>

      <div>
        <h1>Question {question.id}</h1>
        <pre>{JSON.stringify(question, null, 2)}</pre>

        <Link
          href={Routes.EditQuestionPage({
            questionId: question.id,
          })}
        >
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteQuestionMutation({
                id: question.id,
              });
              router.push(Routes.QuestionsPage());
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowQuestionPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.QuestionsPage()}>
          <a>Questions</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Question />
      </Suspense>
    </div>
  );
};

ShowQuestionPage.authenticate = true;

ShowQuestionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowQuestionPage;
