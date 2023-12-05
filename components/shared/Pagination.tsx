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

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    // figuring out which direction are we going
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(), // updating the value based on the nextPageNumber
    });

    router.push(newUrl); // we dont put scroll:false here since we do want to be scrolled back to the top
  }; // accepts direction which is a type string
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        disabled={pageNumber === 1} // will disable the button if we are at page number of 1 since there is no more previous page after that
        onClick={() => handleNavigation("prev")} // prev is a direction
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="flex items-center justify-center rounded-md  bg-primary-100  px-3.5  py-2 dark:bg-yellow-500">
        <p className="body-semibold text-purple-600 dark:text-black">
          {pageNumber}
        </p>
      </div>
      <Button
        disabled={!isNext} // meaning that if it is not true
        onClick={() => handleNavigation("next")} // prev is a direction
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
