import React from "react";
import { BadgeCounts } from "@/types";
import Image from "next/image";

interface Props {
  badges: BadgeCounts;
}

const NameBadge = ({ badges }: Props) => {
  // check if the user pass the badge count
  const hasBadges = badges.GOLD > 0;

  return (
    <div className="ml-0.5">
      {/* render badge for users who surpass the badge count */}
      {hasBadges ? (
        <div>
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
      ) : // if they dont pass the badge count, return null
      null}
    </div>
  );
};

export default NameBadge;
