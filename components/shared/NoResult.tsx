// this is a dynamic reusable component
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}
const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        src="/assets/images/no-result-light.png"
        alt="No result illustration"
        width={96}
        height={96}
        className="block object-contain dark:hidden"
      />

      <Image
        src="/assets/images/no-result-dark.png"
        alt="No result illustration"
        width={96}
        height={96}
        className="hidden object-contain dark:flex"
      />

      <h2 className="h2-bold text-dark200_light900">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button className="paragraph-medium mt-5 min-h-[46px] rounded-lg bg-purple-800 px-4 py-3 text-light-900 dark:bg-purple-300 dark:text-dark-500">
          {linkTitle}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
