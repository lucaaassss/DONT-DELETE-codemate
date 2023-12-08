// this page will render specific question for each tag
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tag Details | Codemate",
};

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q, // q as in query
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="text-dark200_light900 mt-10 flex w-full flex-col gap-6">
        {/* Looping through questions */}
        {/* checks whether there is a question or not.If there is a question,it will map it to the QuestionCard component */}
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There are no tag questions to show"
            description="
            There's currently an empty throne with no questions to show under this tag. Embark on your quest to fill it with inquiries that will rule the realm!👑 "
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1} // we do +searchParams because thing from searchParams is usually in string so we want to convert it into a number
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
