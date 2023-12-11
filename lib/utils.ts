import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string"; // import the query-string library for parsing and stringifying URL queries
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const date = new Date(createdAt);
  const now = new Date();

  const diffMilliseconds = now.getTime() - date.getTime();
  const diffSeconds = Math.round(diffMilliseconds / 1000);
  if (diffSeconds < 60) {
    return `${diffSeconds} seconds ago`;
  }

  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} days ago`;
  }

  const diffMonths = Math.round(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} months ago`;
  }

  const diffYears = Math.round(diffMonths / 12);

  return `${diffYears} years ago`;
};

export function formatNumber(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + "K";
  } else {
    return number.toString();
  }
}

export function getJoinedDate(joinedAt: Date | undefined) {
  if (!joinedAt) {
    return "Joined";
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = joinedAt.getFullYear();
  const month = months[joinedAt.getMonth()];

  return `Joined ${month} ${year}`;
}

// define the shape of the parameters for forming a URL query
interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null; // the value can be a string or null
}

// function to add or update a key-value pair in the URL query
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  // parse the existing URL query parameters into an object
  const currentUrl = qs.parse(params);

  // update or add the specified key with the new value
  currentUrl[key] = value;

  // stringify the updated URL with the modified query parameters
  return qs.stringifyUrl(
    {
      url: window.location.pathname, // get the current URL pathname
      query: currentUrl, // include the modified query parameters
    },
    { skipNull: true } // skip null values in the query parameters
  );
};

// define the shape of the parameters for removing keys from the URL query
interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

// function to remove specified keys from the URL query
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  // parse the existing URL query parameters into an object
  const currentUrl = qs.parse(params);

  // iterate through each key to remove
  keysToRemove.forEach((key) => {
    delete currentUrl[key]; // remove the specified key from the URL parameters
  });

  // stringify the updated URL with the modified query parameters
  return qs.stringifyUrl(
    {
      url: window.location.pathname, // get the current URL pathname
      query: currentUrl, // include the modified query parameters
    },
    { skipNull: true } // skip null values in the query parameters
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

// Function to assign badges
export function assignBadges(params: BadgeParam) {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels = BADGE_CRITERIA[type]; // get the specific type of the badge criteri ato know whether it is a question,answer,etc...

    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level as keyof typeof badgeLevels]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });

  return badgeCounts;
}

interface TruncateParams {
  name: string;
  total: number;
}

export const truncateTag = ({ name, total }: TruncateParams) => {
  if (total >= 2) {
    if (name.length > 4) {
      return `${name.slice(0, 4)}..`;
    } else {
      return name;
    }
  } else {
    return name;
  }
};
