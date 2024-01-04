"use client";
import React, { useState } from "react";
import { BadgeCounts } from "@/types";
import Image from "next/image";

interface Props {
  badges: BadgeCounts;
}

const NameBadge = ({ badges }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="relative flex items-center gap-1">
      {badges.GOLD > 0 ? (
        <div
          className="group relative ml-0.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src="/assets/icons/verifiedlight.svg"
            alt="namebadge"
            height={20}
            width={20}
            className="wiggle ml-0.5 block dark:hidden"
          />

          <Image
            src="/assets/icons/verifieddark.svg"
            alt="namebadge"
            height={20}
            width={20}
            className="wiggle ml-0.5 hidden dark:flex"
          />

          {isHovered && (
            <div className="absolute left-full ml-1 flex w-[150px] -translate-y-1/2 items-center justify-center gap-0 rounded-xl bg-white p-2 text-xs font-bold text-blue-800 dark:bg-dark-300 dark:text-blue-300">
              <div>
                This user is a{" "}
                <span className="text-yellow-500 dark:text-yellow-400">
                  CodeMaster!🎉
                </span>
              </div>
              <Image
                src="/assets/images/robotverifiedlight.png"
                alt="CodeMaster Image"
                height={40}
                width={40}
                className="mt-[-5px] block dark:hidden"
              />

              <Image
                src="/assets/images/robotverifieddark.png"
                alt="CodeMaster Image"
                height={40}
                width={40}
                className="mt-[-5px] hidden dark:flex"
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default NameBadge;
