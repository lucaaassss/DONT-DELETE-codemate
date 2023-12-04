// this is a dynamic reusable component
import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

// we use picture:string because the picture will have a URL which is a string
// we use  answers:Array<object> which means that the answers will have an array of object

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId; // will only display the action button if the clerkId exists and it matches the author's clerk id
  return (
    <div className="text-dark200_light900 card-wrapper mt-3 rounded-[50px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark200_light900 line-clamp-1 flex sm:hidden">
            {/* getTimeStamp is a utility function we have declared in lib > util.ts file */}
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction
              type="Question"
              itemId={JSON.stringify(_id)} // similar to what we have done for the star button since we only want to display it for certain component only
            />
          )}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {/* will map the tags to the RenderTag component */}
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`• asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyles="body-medium text-dark200_light900"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatNumber(upvotes.length)} // if we only do upvotes it will display the user id that upvoted it
          title="Votes"
          textStyles="small-medium text-dark200_light900"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatNumber(answers.length)}
          title="Answers"
          textStyles="small-medium text-dark200_light900"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatNumber(views)}
          title="Views"
          textStyles="small-medium text-dark200_light900"
        />
      </div>
    </div>
  );
};

export default QuestionCard;

// line-clamp-1 means that it will hide the content if it does not fit the Container. "1" indicates the number of maximum line it will show before it is hidden.
// when it is hidden it will show like this "..."
