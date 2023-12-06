"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null); // inserting a reference to the searchbar box so that we know when to close it

  // query parameters are a defined set of parameters (key-value pair) attached to the end of a URL used to provide additional information to a web server when making requests. They are an important part of the URL that define specific content or actions based on the data being passed.
  // to append query params to the end of a URL, a question mark (?) is added followed immediately by a query parameter. To add multiple parameters, an ampersand (&) is added in between each, joining them to form a query string parameter. These can be created by any variation of object types or lengths such as strings, arrays, and numbers. The following is an example:
  // https://example.com/path?name=Branch&products=[Journeys,Email,Universal%20Ads]
  // in this example, there are two query parameters:
  // ‘name’ with the value “Branch”
  // ‘products’ with the value “[Journeys,Email, Universal%20Ads]”
  // these parameters can be used to instruct the web server how to process the request, such as customizing the page based on the ‘name’ field or filtering products based on the ‘products’ list.
  const query = searchParams.get("q"); // getting the name of our query

  const [search, setSearch] = useState(query || ""); // this is for the text on the searchbar,if we share the url that contain certain query,we also want to populate the searchbar with the name of the query
  const [isOpen, setIsOpen] = useState(false);

  // this is for closing the searchbar box if the user click anywhere else outside the searchbar box
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target) // meaning that if the user click somewhere else outside the searchbar box
      ) {
        setIsOpen(false); // close the searchbar box
        setSearch(""); // clear the search
      }
    };

    setIsOpen(false); // whenever the pathname changes,it will close the searchbar box

    document.addEventListener("click", handleOutsideClick); // document.addEventListener of a type click and when we click, we will call the handleOutsideClick function

    return () => {
      document.removeEventListener("click", handleOutsideClick); // clear the document.addEventListener . If we use eventListener in a useEffect,we must clear it back
    };
  }, [pathname]);

  // this is for the url bar,if we type something at the searchbar,the url will also change according to the searchbar
  useEffect(() => {
    // delayDebounceFn as in delayDebounceFunction
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        // if a search was made,we will create a new URL
        const newUrl = formUrlQuery({
          // passing everything we need in the new URL
          params: searchParams.toString(), // we also declare params because there could also be existing params in there such as category,filtering,pages,etc so we also want to include it as well in our url
          key: "global", // q as in query
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        // if there is a query at the local searchbar, we want to remove the keys from global since we dont want to do two search at the same time
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });
          router.push(newUrl, { scroll: false }); // scroll:false means that when the navigation to the new URL occurs, the page will not be scrolled to the top. Typically, when we navigate to a new page or URL, the browser automatically scrolls to the top of the page.We want to keep the user's current position in the search results rather than scrolling them to the top of the page after a search is performed
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn); // If any of the useEffect dependencies change, the cleanup function will be called before the new setTimeout is set up. This ensures that if the user interacts with the component (e.g., changes the query) before the 300 milliseconds pass, the previous timeout is canceled, and a new one is scheduled based on the updated state or props.This helps in avoiding unexpected behavior and potential issues
  }, [search, router, pathname, searchParams, query]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        {/* for the search text input */}
        <Input
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);

            // to check whether the searchbar box should be open or not
            if (!isOpen) setIsOpen(true); // if isOpen is false, we will setIsOpen to true,meaning that we will open the searchbar box

            if (event.target.value === "" && isOpen)
              // if the searchbar is empty and isOpen is true,we will close the searchbar box
              setIsOpen(false);
          }}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none text-white shadow-none outline-none dark:text-dark-300"
        />
      </div>
      {/* if isOpen is true show GlobalResult component or in other words searchbar box */}
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;

// className="relative w-full max-w-[600px] max-lg:hidden"
// relative: Positions the div element relative to its normal position in the document flow.
// w-full: Makes the div element take up the full width of its parent.
// max-w-[600px]: Sets a maximum width of 600 pixels for the div.
// max-lg:hidden: Hides the div on screens with a maximum width of large (responsive styling).

// className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4"
// background-light800_darkgradient: Sets the background color or background gradient for the div with specific light and dark colors or gradients.
// relative: Positions the div element relative to its normal position in the document flow.
// flex: Makes the div element a flex container.
// min-h-[56px]: Sets a minimum height of 56 pixels for the div.
// grow: Indicates that the div can grow to occupy available space.
// items-center: Centers the content vertically within the div.
// gap-1: Adds a gap of 1 unit between child elements for spacing.
// rounded-xl: Applies rounded corners with a rounded border to the div.
// px-4: Adds padding of 4 units to the left and right sides of the div.

// className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
// paragraph-regular: Styles the text within the input with regular paragraph text formatting.
// no-focus: Removes the focus indicator (e.g., the outline) from the input element.
// placeholder: Applies styling to the placeholder text within the input.
// background-light800_darkgradient: Sets the background color or background gradient of the input.
// border-none: Removes any borders from the input.
// shadow-none: Eliminates any box shadow or drop shadow from the input.
// outline-none: Removes the outline that appears when the input is focused.
