// this is a dynamic reusable component

"use client"; // change to client side because we use onChange
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// interface is like a rulebook that tells other parts of your code how to use the component.
// it defines a set of "rules" for what kind of information or data you can provide to the component.
// if we use use the LocalSearchbar component elsewhere in the code, we need to follow these rules and provide these specific pieces of information as props or else we will get error.
interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}
const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // query parameters are a defined set of parameters (key-value pair) attached to the end of a URL used to provide additional information to a web server when making requests. They are an important part of the URL that define specific content or actions based on the data being passed.
  // to append query params to the end of a URL, a question mark (?) is added followed immediately by a query parameter. To add multiple parameters, an ampersand (&) is added in between each, joining them to form a query string parameter. These can be created by any variation of object types or lengths such as strings, arrays, and numbers. The following is an example:
  // https://example.com/path?name=Branch&products=[Journeys,Email,Universal%20Ads]
  // in this example, there are two query parameters:
  // ‘name’ with the value “Branch”
  // ‘products’ with the value “[Journeys,Email, Universal%20Ads]”
  // these parameters can be used to instruct the web server how to process the request, such as customizing the page based on the ‘name’ field or filtering products based on the ‘products’ list.
  const query = searchParams.get("q"); // getting the name of our query

  const [search, setSearch] = useState(query || ""); // this is for the text on the searchbar,if we share the url that contain certain query,we also want to populate the searchbar with the name of the query

  // this is for the url bar,if we type something at the searchbar,the url will also change according to the searchbar
  useEffect(() => {
    // delayDebounceFn as in delayDebounceFunction
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        // if a search was made,we will create a new URL
        const newUrl = formUrlQuery({
          // passing everything we need in the new URL
          params: searchParams.toString(), // we also declare params because there could also be existing params in there such as category,filtering,pages,etc so we also want to include it as well in our url
          key: "q", // q as in query
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        // if there is no search made
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {/* if the iconPosition is on the left,it will show the icon on the left */}
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      {/* we made the declared value of the placeholder as {placeholder} because it will change as the page changes */}
      {/* no-focus means that we will remove the ugly outline */}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />

      {/* if the iconPosition is on the right,it will show the icon on the right */}
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearchbar;

// className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
// background-light800_darkgradient: Sets the background color of the container to a specific light-to-dark gradient.
// flex: Makes the container a flex container, allowing its children to be easily arranged.
// min-h-[56px]: Sets a minimum height of 56 pixels for the container.
// grow: Indicates that the container can grow to occupy available space within its parent container.
// items-center: Vertically centers the content inside the container.
// gap-4: Adds a gap of 4 units between child elements for spacing.
// rounded-[10px]: Applies rounded corners with a radius of 10 pixels to the container.
// px-4: Adds padding of 4 units to the left and right sides of the container.
// ${otherClasses}: Allows for additional custom CSS classes to be added to the container if provided through the otherClasses prop.

// className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
// paragraph-regular: Styles the text within the input element as regular paragraph text, affecting font size, line height, and font weight.
// no-focus: Removes the visual focus indicator (e.g., the outline) from the input element.
// placeholder: Applies styling to the placeholder text within the input element.
// background-light800_darkgradient: Sets the background color or background gradient of the input element.
// border-none: Removes any borders from the input element.
// shadow-none: Eliminates any box shadow or drop shadow from the input element.
// outline-none: Removes the outline that appears when the input element is focused.
