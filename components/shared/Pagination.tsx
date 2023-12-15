// this is a reusable component

"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  pageNumber: number;
  isNext: boolean;
}

function Pagination({ pageNumber, isNext }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (type: "prev" | "next") => {
    // figuring out which direction are we going
    const nextPageNumber = type === "prev" ? pageNumber - 1 : pageNumber + 1;

    const value = nextPageNumber > 1 ? nextPageNumber.toString() : null;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value,
    });

    router.push(newUrl); // we dont put scroll:false here since we do want to be scrolled back to the top
  }; // accepts direction which is a type string

  if (!isNext && pageNumber === 1) return null; // if we cannot go to the next page and if we cannot go back to previous page , we will hide this pagination component

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1} // will disable the button if we are at page number of 1 since there is no more previous page after that
        onClick={() => handleNavigation("prev")} // prev is a direction
        className="btn flex min-h-[36px] items-center justify-center gap-2"
      >
        <p className="body-medium text-dark-300">Prev</p>
      </Button>
      <div className="flex items-center justify-center rounded-md  bg-primary-100  px-3.5  py-2 dark:bg-blue-800">
        <p className="body-semibold text-purple-600 dark:text-white">
          {pageNumber}
        </p>
      </div>
      <Button
        disabled={!isNext} // meaning that if it is not true
        onClick={() => handleNavigation("next")} // prev is a direction
        className="btn flex min-h-[36px] items-center justify-center gap-2"
      >
        <p className="body-medium text-dark-300">Next</p>
      </Button>
    </div>
  );
}

export default Pagination;
