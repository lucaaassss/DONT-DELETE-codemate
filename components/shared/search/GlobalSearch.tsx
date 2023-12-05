import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
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
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
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
