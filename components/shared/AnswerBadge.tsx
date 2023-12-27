import React from "react";
import { BadgeCounts } from "@/types";
import Image from "next/image";

interface Props {
  badges: BadgeCounts;
}

const NameBadge = ({ badges }: Props) => {
  // Check if the user has any badges
  const hasBadges = badges.GOLD > 0;

  return (
    <div className="ml-0.5">
      {/* Always render the badge UI for all users */}

      {/* Render additional content for users who surpass the badge count */}
      {hasBadges ? (
        // Render additional content (or modify as needed)
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
      ) : 
        null
      }

      {/* Add similar blocks for other badge types (SILVER, GOLD, etc.) if needed */}
    </div>
  );
};

export default NameBadge;
