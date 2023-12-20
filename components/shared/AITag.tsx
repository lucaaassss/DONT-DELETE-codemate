"use client";

import React, { useState } from "react";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Button } from "../ui/button";

interface Props {
  tag: string;
}
const AITag = ({ tag }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagDescription, setTagDescription] = useState("");

  const generateAITagDescription = async () => {
    setIsSubmitting(true);

    try {
      // make API call to API endpoint for tag description generation
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          body: JSON.stringify({
            type: "tagDescription",
            tag,
          }),
        }
      );

      const aiTagDescription = await response.json();

      // set the generated tag description in the state
      setTagDescription(aiTagDescription.reply);

      // toast notification
      toast({
        title: "AI Tag Description Generated",
        description: "The AI has successfully generated a tag description.",
      });
    } catch (error) {
      // handle error and show toast
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with the AI request for tag description.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <Button
          className="btn-fourth light-border-2 mt-5 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-white"
          onClick={generateAITagDescription}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Tag Description
            </>
          )}
        </Button>
      </div>

      {/* Conditionally render the div if there is an AI response */}
      {tagDescription && (
        <>
          <h4 className="paragraph-semibold text-dark400_light800 mt-5">
            AI-Generated Tag Description:
          </h4>
          <div className="mt-4">
            {/* display the generated tag description in a div */}
            <div className="body-regular text-dark400_light800 bg-purple-200 p-7 text-dark-300 dark:bg-purple-950 dark:text-white">
              {tagDescription}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AITag;
