import React from "react";
import { BadgeCounts } from "@/types";
import Image from "next/image";
interface Props {
  badges: BadgeCounts;
}

const NameBadge = ({ badges }: Props) => {
  return (
    <div>
      {badges.GOLD > 0 ? (
        <div className="ml-1">
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
      ) : null}
    </div>
  );
};

export default NameBadge;
