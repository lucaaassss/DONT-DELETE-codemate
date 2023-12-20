"use client"; // because we are using hooks

import { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { AnswerSchema } from "@/lib/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  question: string;
  questionId: string;
  authorId: string;
}

const Answer = ({ question, questionId, authorId }: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const { mode } = useTheme();
  const editorRef = useRef(null);
  // this code for the form is retrieved from the shadcn documentation for form
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    if (!authorId)
      return toast({
        title: "Please log in",
        description: "Log in to post an Answer",
      });

    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });
      form.reset(); // clear the form back after submitting so that user can add another answer if they want to

      // editorRef.current means that if something is in the editor
      if (editorRef.current) {
        const editor = editorRef.current as any; // as any is used just to avoid TypeScript error

        editor.setContent(""); // clear the editor back after submitting
      }

      toast({
        title: "Answer Posted",
        description: "Answer successfully posted.",
      });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with the request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      // convert plain text to HTML format
      const formattedAnswer = aiAnswer.reply.replace(/\n/g, "<br>"); // globally replace each line of the AI answer reply with a break tag

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(formattedAnswer); // populate the tiny editor with the formatted answer
      }

      // toast notification
      toast({
        title: "AI Answer Generated",
        description:
          "The AI has successfully generated an answer based on given query.",
      });
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with user AI request. Take this chance to try to answer it independently!",
      });
    } finally {
      setIsSubmittingAI(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className=" paragraph-semibold text-dark400_light800 mt-5">
          Write Your Answer Here:
        </h4>
        <Button
          className="btn-fourth light-border-2 mt-5 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-white"
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
              Generate AI Answer
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY} // will process the API key from the .env.local file
                    onInit={(evt, editor) => {
                      // ts-ignore is going to ignore the error as tiny needs it the way it is
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur} // onBlur will run once we exit the editor.It will save the value inserted
                    onEditorChange={(content) => field.onChange(content)} // will change the content of the editor according to what we have inserted
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo |  " +
                        "codesample | bold italic forecolor | alignleft aligncenter | " +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>

                {/* FormMessage is for displaying success or error messages,in this case we want to display error message */}
                <FormMessage className="text-red-500 dark:text-red-300" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient dark:primary-gradient-dark w-fit text-white"
              disabled={isSubmitting} // disabled if isSubmitting is true
            >
              {isSubmitting ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>Submit</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
