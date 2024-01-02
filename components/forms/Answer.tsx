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
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  questionId: string;
  authorId: string;
}

const Answer = ({ questionId, authorId }: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div>
      <h4 className=" paragraph-semibold text-dark400_light800 mt-5">
        Write Your Answer Here:
      </h4>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            key={mode}
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
