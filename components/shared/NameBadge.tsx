import React from "react";
import { BadgeCounts } from "@/types";
import Image from "next/image";
interface Props {
  badges: BadgeCounts;
}

const NameBadge = ({ badges }: Props) => {
  return (
    <div className="flex items-center gap-1">
      {badges.GOLD > 0 ? (
        <>
          <div className="ml-0.5">
            <Image
              src="/assets/icons/verifiedlight.svg"
              alt="namebadge"
              height={20}
              width={20}
              className="block dark:hidden"
            />

            <Image
              src="/assets/icons/verifieddark.svg"
              alt="namebadge"
              height={20}
              width={20}
              className="hidden dark:flex"
            />
          </div>

          <div className=" animate__fadeIn shine rounded-xl p-1 text-xs font-bold text-blue-800 dark:text-blue-300">
            CodeMaster
          </div>
        </>
      ) : null}
    </div>
  );
};

export default NameBadge;
