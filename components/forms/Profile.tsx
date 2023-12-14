"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { ProfileSchema } from "@/lib/validations";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";
import { toast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Props {
  clerkId: string;
  user: string;
}

const Profile = ({ clerkId, user }: Props) => {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: parsedUser.name || "",
      username: parsedUser.username || "",
      portfolioWebsite: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  });

  // 2. Define a submit handler.
  // once we click the submit button it will run this function
  async function onSubmit(values: z.infer<typeof ProfileSchema>) {
    setIsSubmitting(true);
    try {
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });

      toast({
        title: "Profile Updated",
        description: "Profile information has been successfully updated.",
      });

      router.back(); // the user can see that they updated their profile
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with the request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-9 flex w-full flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Name <span className="text-red-500 dark:text-red-300">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter name"
                  className="no-focus paragraph-regular background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Username{" "}
                <span className="text-red-500 dark:text-red-300">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter username"
                  className="no-focus paragraph-regular background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Portfolio Link{" "}
                <span className="text-red-500 dark:text-red-300">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Enter portfolio URL"
                  className="no-focus paragraph-regular background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Location{" "}
                <span className="text-red-500 dark:text-red-300">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter origin"
                  className="no-focus paragraph-regular background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="space-y-3.5">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Bio <span className="text-red-500 dark:text-red-300">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Enter bio"
                  className="no-focus paragraph-regular background-light700_dark300 text-dark300_light700 min-h-[56px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-7 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient dark:primary-gradient-dark w-fit text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>Save</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
