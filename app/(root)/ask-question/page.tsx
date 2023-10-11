import React from "react";
import QuestionForm from "@/components/forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const AskQuestion = async () => {
  // const { userId } = auth();
  // dummy user id from mongo
  const userId = "c45678";

  if (!userId) redirect("/sign-in");

  const user = await getUserById({ userId });

  console.log(user);

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
