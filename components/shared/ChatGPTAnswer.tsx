"use client";

import React, { useState } from "react";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          body: JSON.stringify({ type: "qna", question }),
        }
      );

      const aiAnswer = await response.json();
      setAIAnswer(aiAnswer.reply);

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

  const renderContent = (content: string) => {
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const segments = content.split(codeBlockRegex);

    return segments.map((segment, index) => {
      if (index % 2 === 1) {
        // This is a code block
        return (
          <div
            key={index}
            className="my-[-25px] max-w-full overflow-auto rounded-lg p-2"
          >
            <SyntaxHighlighter
              language="javascript"
              style={duotoneLight}
              className="rounded-lg"
            >
              {segment}
            </SyntaxHighlighter>
          </div>
        );
      }
      return segment.split(/\n/).map((line, lineIndex) => (
        <div key={lineIndex}>
          {line
            .split(/(\*\*.*?\*\*|\bhttps?:\/\/\S+)/)
            .map((part, partIndex) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
              } else if (part.match(/\bhttps?:\/\/\S+/)) {
                return (
                  <a
                    key={partIndex}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 dark:text-blue-400"
                  >
                    {part}
                  </a>
                );
              }
              return <span key={partIndex}>{part}</span>;
            })}
          {lineIndex < content.split(/\n/).length - 1 && <br />}
        </div>
      ));
    });
  };

  return (
    <div className="gap-5 sm:flex-row sm:items-center sm:gap-2">
      <div className="flex flex-col items-center justify-center overflow-x-auto ">
        <Button
          className="shinegenerate mt-10 gap-1.5 rounded-md border-2 border-white px-[80px] py-2.5 text-black shadow-none dark:text-white max-xs:px-10"
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
            <div className="body-regular text-dark400_light800 flex rounded-2xl bg-purple-200 p-4 text-dark-300 dark:bg-purple-950 dark:text-white">
              <div className="ml-[2px] mt-[0.2px] shrink-0">
                <Image
                  src="/assets/images/chatgptlight.png"
                  alt="chatgpt"
                  width={70}
                  height={70}
                  className="floatingImage block object-contain dark:hidden"
                />
                <Image
                  src="/assets/images/chatgptdark.png"
                  alt="chatgpt"
                  width={70}
                  height={70}
                  className="floatingImage hidden object-contain dark:flex"
                />
              </div>
              <div className="ml-5 max-w-full grow overflow-auto">
                {renderContent(AIAnswer)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Button
              className="btn-fourth light-border-2 mt-10 rounded-md px-[30px] py-2.5 shadow-none"
              onClick={generateAIAnswer}
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
                  className="invert-colors max-md:flip-vertical max-sm:flip-vertical sm:unflip-vertical md:unflip-vertical xs:unflip-vertical max-xs:flip-vertical object-contain"
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
