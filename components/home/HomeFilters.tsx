"use client"; // since we are using onClick

import React, { useState } from "react";
import { Button } from "../ui/button";
import { HomePageFilters } from "@/constants/filters";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

// similar to the method used in local searchbar but with a few changes
const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterParams = searchParams.get("filter");

  const [active, setActive] = useState(filterParams || "");

  const handleTypeClick = (item: string) => {
    let newUrl = "";
    // once we cick something,we get the item that we clicked on which is a type string
    if (active === item) {
      // if the user click the same filter option again,meaning they want to turn it off
      setActive(""); // changing the colour of the filter option clicked.setActive to empty string since it is turned off
      newUrl = formUrlQuery({
        // passing everything we need in the new URL
        params: searchParams.toString(), // we also declare params because there could also be existing params in there such as category,filtering,pages,etc so we also want to include it as well in our url
        key: "filter",
        value: null, // set the value to null since we removed the filter
      });

      router.push(newUrl, { scroll: false });
    } else {
      // if the user click one of the the filter option
      setActive(item); // changing the colour of the filter option clicked
      const newUrl = formUrlQuery({
        // passing everything we need in the new URL
        params: searchParams.toString(), // we also declare params because there could also be existing params in there such as category,filtering,pages,etc so we also want to include it as well in our url
        key: "filter",
        value: item.toLowerCase(), // set the value to lowercase in the URL
      });

      router.push(newUrl, { scroll: false }); // scroll:false means that when the navigation to the new URL occurs, the page will not be scrolled to the top. Typically, when we navigate to a new page or URL, the browser automatically scrolls to the top of the page.We want to keep the user's current position in the search results rather than scrolling them to the top of the page after a search is performed
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? " bg-primary-100 text-purple-600 dark:bg-blue-800 dark:text-white"
              : "bg-light-800 text-light-500"
          }`}
          onClick={() => handleTypeClick(item.value)} // call handleTypeClick function and passed item.value
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
