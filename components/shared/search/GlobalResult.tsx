"use client";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);

  const global = searchParams.get("global"); // for the query that we insert into the search bar
  const type = searchParams.get("type"); // comes from the url.For the filtering in the searchbar box, meaning that we want to know what type are we filtering so that we can fetch it

  const emojis = ["🤖", "😶‍🌫️", "🤯", "🥸", "🥶", "😬", "🔍", "❓"];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]; // display random emojis if there is no result

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);

      try {
        // fetch everything

        const res = await globalSearch({
          // @ts-ignore
          query: global, // query of a type global
          type,
        });

        setResult(JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]); // use Effect will run again if global and type change

  // renderLink is used to determine the link on where whould the link used in the Content section direct to
  // because we can point to question,tags,users,etc
  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/question/${id}`;
      case "answer":
        return `/question/${id}`; // will return to question because there is no specific answer detail page,the answer is contained within the question
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;

      default:
        return "/";
    }
  };

  return (
    // z-10 is used to bring the searchbar box forward
    <div className="custom-scrollbar absolute top-full z-10 mt-3 w-full overflow-y-auto rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
      <GlobalFilters />
      {/* this is for the line that separates filters and top match */}
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">
          Top Match
        </p>

        {isLoading ? (
          <div className="flex-center flex-col px-5">
            {/* ReloadIcon is coming from radix react icons library */}
            {/* animate-spin is what makes the icon spin, it is a special built in tailwind class */}
            <ReloadIcon className="my-2 h-10 w-10 animate-spin text-purple-900 dark:text-purple-300" />
            <p className="text-dark200_light800 body-regular">
              Browsing the entire database
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: any, index: number) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={item.type + item.id + index} // to make sure that it is truly pointing to the right direction, we can combine a few properties
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />

                  <div className="flex flex-col">
                    <p className="body-medium line-clamp-1 text-dark-300 dark:text-white">
                      {item.title}
                    </p>
                    <p className="small-medium mt-1 font-bold capitalize text-dark-400 dark:text-light-800">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-5xl">{randomEmoji}</p>
                <p className="text-dark200_light800 body-regular px-5 py-2.5">
                  Oops,no results found!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResult;
