"use client";

import React, { useState } from "react";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface Props {
  question: string;
  authorId: string;
}
const ChatGPTAnswer = ({ question, authorId }: Props) => {
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const [AIAnswer, setAIAnswer] = useState("");

  const generateAIAnswer = async () => {
    if (!authorId)
      return toast({
        title: "Please log in",
        description: "Log in to generate an AI Answer",
      });

    setIsSubmittingAI(true);

    try {
      // make API call to API endpoint
      // we put env here because we want our API to work in both localhost and deployes website
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          body: JSON.stringify({ type: "qna", question }), // passing the question to the AI. Refer app>api>chatgpt>route.ts
        }
      );

      const aiAnswer = await response.json();

      setAIAnswer(aiAnswer.reply);

      // toast notification
      toast({
        title: "AI Answer Generated",
        description:
          "The AI has successfully generated an answer based on given query.",
      });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "AI request took too long to respond :(",
      });
    } finally {
      setIsSubmittingAI(false);
    }
  };
  return (
    <div className="gap-5 sm:flex-row sm:items-center sm:gap-2">
      <div className="flex flex-col items-center justify-center">
        <Button
          className="shinegenerate mt-10 gap-1.5 rounded-md border-4 border-white px-[80px] py-2.5 text-black shadow-none dark:text-white"
          onClick={generateAIAnswer}
          disabled={isSubmittingAI}
        >
          {isSubmittingAI ? (
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
              Generate Swift AI Answer
            </>
          )}
        </Button>
      </div>

      {AIAnswer && (
        <>
          <h4 className="paragraph-semibold text-dark400_light800 mt-5">
            AI-Generated Answer:
          </h4>
          <div className="mt-4">
            {/* display the generated tag description in a div.Will only display this div if the generate AI answer button is clicked */}
            <div className="body-regular text-dark400_light800 flex rounded-2xl bg-purple-200 p-7 text-dark-300 dark:bg-purple-950 dark:text-white">
              <div className="ml-[-5px] mt-[0.2px] shrink-0">
                <Image
                  src="/assets/images/chatgptlight.png"
                  alt="chatgpt"
                  width={70}
                  height={70}
                  className="block object-contain dark:hidden"
                />

                <Image
                  src="/assets/images/chatgptdark.png"
                  alt="chatgpt"
                  width={70}
                  height={70}
                  className="hidden object-contain dark:flex"
                />
              </div>
              <div className="ml-5">
                {AIAnswer.split("\n").map((line, index) => (
                  <div key={index}>
                    {line}
                    {/* add a line break after each line except for the last line */}
                    {index < AIAnswer.split("\n").length - 1 && <br />}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Button
              className="btn-fourth light-border-2 mt-10 rounded-md px-[30px] py-2.5 shadow-none"
              onClick={generateAIAnswer} // if thumbs down is clicked,it will regenerate the AI Answer
              disabled={isSubmittingAI}
            >
              {isSubmittingAI ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin text-black dark:text-white" />
                </>
              ) : (
                <>
                  <Image
                    src="/assets/icons/thumbsdown.svg"
                    alt="thumbsdown"
                    width={14}
                    height={14}
                    className="invert-colors object-contain"
                  />
                </>
              )}
            </Button>
            <Button
              className="btn-fourth light-border-2 mt-10 rounded-md px-[30px] py-2.5 shadow-none"
              onClick={() => {
                toast({
                  title: "AI Answer Accepted",
                  description: "Hope you are enjoying your time at Codemate!",
                });
              }}
              disabled={isSubmittingAI}
            >
              <>
                <Image
                  src="/assets/icons/thumbsup.svg"
                  alt="thumbsup"
                  width={14}
                  height={14}
                  className="invert-colors max-lg:flip-vertical object-contain"
                  // flip-vertical is a custom class
                />
              </>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatGPTAnswer;
