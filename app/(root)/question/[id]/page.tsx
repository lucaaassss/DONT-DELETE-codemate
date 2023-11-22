// this page is going to be rendered in each specific question
import Answer from "@/components/forms/Answer";
import AllAnswers from "@/components/shared/AllAnswers";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params, searchParams }) => {
  const { userId: clerkId } = auth();

  let mongoUser;

  // if clerkId exists
  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId }); // now we have access to the mongoUser that have the id of the author that creates the answer
  }

  const result = await getQuestionById({ questionId: params.id }); // the params is coming from the url bar
  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question" // to check the type whether it is question or answer
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(mongoUser._id)}
              upvotes={result.upvotes.length} // to display the number of upvotes
              hasupVoted={result.upvotes.includes(mongoUser._id)} // to check if the current question includes the user id.If it does, it means that the user already upvoted
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)} // to check if the save array under a specific array includes the id of the question
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>

      <div className="text-dark200_light900 mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimeStamp(result.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark200_light900"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatNumber(result.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark200_light900"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(result.views)}
          title="Views"
          textStyles="small-medium text-dark200_light900"
        />
      </div>

      <div className="light-border mt-7 w-full rounded-2xl border-b bg-purple-950 px-7 py-10 text-white dark:bg-purple-400 dark:text-black">
        <ParseHTML data={result.content} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      {/* existing answers */}
      <AllAnswers
        questionId={result._id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
      />

      {/* answer that we can insert */}
      <Answer
        question={result.content}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(mongoUser._id)}
      />
    </>
  );
};

export default Page;
