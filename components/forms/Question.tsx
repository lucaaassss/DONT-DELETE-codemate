// the QuestionSchema used in this file is retrieved from lib>validations.ts because we want our code to be scalable so move it to another place
"use client"; // because we will be using a lot of forms,states,key presses
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"; // zod allow us to have specific requirements such as a password has to contain maximum of 5 characters,a title must contain an emoji,has to be a link and many more

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionsSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import Image from "next/image";

const type: any = "create"; // the form will be reusable so it will have many different types such as edit and create.In this case we set it as create

const Question = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true);

    // try is used to see if it is successful in doing something.Catch is used if it fails.Finally is used regardless of it succeeds or fails
    try {
      // make an async call to the API/database to create a question
      // the call will contain all form data
      // navigate to home page to see the question
    } catch (error) {
    } finally {
      setIsSubmitting(false); // setIsSubmitting will be set to false regardless the task fail or not
    }
  }

  // event:React.KeyboardEvent<HTMLInputElement> means that event is a type of React Keyboard Event specifically HTMLInputElement
  const handleInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (event.key === "Enter" && field.name === "tags") {
      event.preventDefault(); // to prevent the page from reloading

      const tagInput = event.target as HTMLInputElement;
      const tagValue = tagInput.value.trim(); // to remove whitespaces

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters",
          });
        }
        // if(!field.value.includes(tagValue as never)) means that we are checking that the tags does not exist already within the field.If there are same tags it will never count the tag as a tagValue
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags"); // to clear the tags field
        }
      } else {
        form.trigger();
      }
    }
  };

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag); // meaning that we are creating a new instance ofthe modified tags but we did not include the ones that is being clicked.(t:string)=>t!==tag means that it will include all tags but the tag must not be equalled to the ones that being clicked

    form.setValue("tags", newTags); // set the value using the newTags instance
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-gray-500 dark:text-light-500">
                Insert a specific title for the problem.
              </FormDescription>
              {/* FormMessage is for displaying success or error messages,in this case we want to display error message */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detailed Explanation Of The Problem{" "}
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY} // will process the API key from the .env.local file
                  onInit={(evt, editor) => {
                    // ts-ignore is going to ignore the error as tiny needs it the way it is
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  initialValue=""
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
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-gray-500 dark:text-light-500">
                Provide a clear and thorough explanation of the problem to help
                others understand it better.Minimum 20 characters.
              </FormDescription>
              {/* FormMessage is for displaying success or error messages,in this case we want to display error message */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags"
                    onKeyDown={(event) => handleInputKeyDown(event, field)}
                  />

                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {/* field will map the value to the tag */}
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2"
                          style={{ textTransform: "uppercase" }}
                          onClick={() => handleTagRemove(tag, field)}
                        >
                          {tag}
                          <Image
                            src="/assets/icons/close.svg"
                            alt="Close icon"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-gray-500 dark:text-light-500">
                Add up to 3 tags to describe what the question is about.Press
                Enter to add a tag.
              </FormDescription>
              {/* FormMessage is for displaying success or error messages,in this case we want to display error message */}
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {/* disabled={isSubmitting} is a safety measure.It will disallow us to press the submit button for the second time which can cause some chaos in the database */}
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
