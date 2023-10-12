import React from "react";
import { getQuestionById } from "@/lib/actions/question.action";

const Question = async ({ params }: any) => {
  const question = await getQuestionById({ questionId: params.id });
  return <div>Question: {question?.title}</div>;
};

export default Question;
