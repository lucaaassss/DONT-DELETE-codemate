import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

// _id is a common practice of naming id when we want to connect to the database
const hotQuestions = [
  { _id: 1, title: "Famous UI libraries recommendations" },
  { _id: 2, title: "How do I connect my application to MongoDB?" },
  { _id: 3, title: "What is Hook in React?" },
  { _id: 4, title: "Proper way to use async/await functions" },
  { _id: 5, title: "How do I use express as a custom server in Next.jS?" },
];

const popularTags = [
  { _id: 1, name: "C++", totalQuestions: 3 },
  { _id: 2, name: "Java", totalQuestions: 5 },
  { _id: 3, name: "JavaScript", totalQuestions: 10 },
  { _id: 4, name: "React", totalQuestions: 7 },
  { _id: 4, name: "Next.js", totalQuestions: 15 },
];

const RightSidebar = () => {
  return (
    <section
      className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] 
      flex-col  overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      {/* use div to create a section */}
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>

              {/* for arrow icon */}
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
