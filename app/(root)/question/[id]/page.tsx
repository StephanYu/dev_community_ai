import React from "react";
import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import { getQuestionById } from "@/lib/actions/question.action";
import Metric from "@/components/shared/Metric";
import Image from "next/image";
import { getTimestamp, formatAndDivideNumber } from "@/lib/utils";
import Votes from "@/components/shared/Votes";
import ParseHTML from "@/components/shared/ParseHTML";
import Link from "next/link";
import RenderTag from "@/components/shared/RenderTag";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

const Question = async ({ params, searchParams }: any) => {
  const { userId } = auth();

  let user;

  if (userId) {
    user = await getUserById({ userId });
  }

  const question = await getQuestionById({ questionId: params.id });
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={question._id}
        userId={user._id}
        totalAnswers={question.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />

      <AnswerForm
        question={question.content}
        questionId={JSON.stringify(question._id)}
        authorId={JSON.stringify(user._id)}
      />
    </>
  );
};

export default Question;
