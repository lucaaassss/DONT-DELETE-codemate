// this is a dynamic reusable component

"use client"; // change to client side because we use onChange
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

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
        value=""
        onChange={() => {}}
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
