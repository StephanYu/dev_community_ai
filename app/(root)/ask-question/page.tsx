import React from "react";
import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

const AskQuestion = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <QuestionForm userId={JSON.stringify(user._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
