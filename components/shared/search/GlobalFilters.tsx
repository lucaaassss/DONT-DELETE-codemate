"use client";
import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type"); // to know what type are we getting whether it is questions,answers,tag,users

  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (item: string) => {
    let newUrl = "";
    // once we cick something,we get the item that we clicked on which is a type string
    if (active === item) {
      // if the user click the same filter option again,meaning they want to turn it off
      setActive(""); // changing the colour of the filter option clicked.setActive to empty string since it is turned off
      newUrl = formUrlQuery({
        // passing everything we need in the new URL
        params: searchParams.toString(), // we also declare params because there could also be existing params in there such as category,filtering,pages,etc so we also want to include it as well in our url
        key: "type", // modifying the type
        value: null, // set the value to null since we removed the filter
      });

      router.push(newUrl, { scroll: false });
    } else {
      // if the user click one of the the filter option
      setActive(item); // changing the colour of the filter option clicked
      newUrl = formUrlQuery({
        // passing everything we need in the new URL
        params: searchParams.toString(), // we also declare params because there could also be existing params in there such as category,filtering,pages,etc so we also want to include it as well in our url
        key: "type", // clear the type
        value: item.toLowerCase(), // set the value to lowercase in the URL
      });

      router.push(newUrl, { scroll: false }); // scroll:false means that when the navigation to the new URL occurs, the page will not be scrolled to the top. Typically, when we navigate to a new page or URL, the browser automatically scrolls to the top of the page.We want to keep the user's current position in the search results rather than scrolling them to the top of the page after a search is performed
    }
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type:</p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-light-800
          ${
            active === item.value
              ? " bg-primary-100 text-purple-600 dark:bg-blue-800 dark:text-white"
              : "bg-light-700 text-dark-300 hover:text-purple-900 dark:bg-light-400 dark:hover:text-purple-300"
          }
          
          `}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
