import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { SignedIn, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJoinedDate } from "@/lib/utils";
import ProfileLink from "@/components/shared/ProfileLink";
import Stats from "@/components/shared/Stats";
import QuestionTab from "@/components/shared/QuestionTab";
import AnswersTab from "@/components/shared/AnswersTab";

import type { Metadata } from "next";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import RenderTag from "@/components/shared/RenderTag";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Profile | Codemate",
};

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const userInfo = await getUserInfo({ userId: params.id });

  if (!userInfo.user) return null;

  const interactedTags = await getTopInteractedTags({
    userId: userInfo.user._id,
    limit: 5,
  });

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">
              {userInfo.user.name}
            </h2>
            <p className="paragraph-regular text-dark200_light800">
              @{userInfo.user.username}
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink
                  imgUrl="/assets/icons/link.svg"
                  href={userInfo.user.portfolioWebsite}
                  title="Click me!"
                />
              )}

              {userInfo.user.location && (
                <ProfileLink
                  imgUrl="/assets/icons/location.svg"
                  title={userInfo.user.location}
                />
              )}

              <ProfileLink
                imgUrl="/assets/icons/calendar-red.svg"
                title={getJoinedDate(userInfo.user.joinedAt)}
              />
            </div>
            {userInfo.user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {userInfo.user.bio}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && ( // since we can also view other users profile,we need to ensure that that the clerkId match our profile clerkId so that we can use the update option.Other users cant edit our profile since their id does not match
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary min-h-[46px] min-w-[175px] px-4 py-3 text-white dark:text-dark-300">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        totalQuestions={userInfo.totalQuestions}
        totalAnswers={userInfo.totalAnswers}
        badges={userInfo.badgeCounts}
      />
      <div className="mt-10 flex gap-10 ">
        <Tabs defaultValue="top-posts" className="flex-1 ">
          <TabsList className=" min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Questions
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Top Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-2"
          >
            <QuestionTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent value="answers" className="flex w-full flex-col gap-4 ">
            <AnswersTab
              searchParams={searchParams}
              userId={userInfo.user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
        <div className="flex min-w-[278px] flex-col max-lg:hidden">
          <h3 className="h3-bold text-dark200_light900">Top Tags</h3>

          {interactedTags.length > 0 ? (
            <div className=" mt-12 flex flex-col gap-4">
              {interactedTags.map((tag) => (
                <RenderTag
                  key={tag._id}
                  _id={tag._id}
                  name={tag.name}
                  totalQuestions={tag.questions.length}
                  showCount
                />
              ))}
            </div>
          ) : (
            <Badge className="ml-[-9px] mt-9 text-[18px] font-bold text-purple-800 dark:text-purple-300">
              No Current Tags
            </Badge>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
