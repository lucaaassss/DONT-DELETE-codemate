import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";
import Tips from "../Tips";

// Navigation bar or nav bar for short
const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={40}
          height={40}
          alt="Codemate"
        />
        <p className="h2-bold font-spaceGrotesk text-purple-800 dark:text-purple-500 max-sm:hidden">
          ode<span className="text-purple-500 dark:text-purple-300">mate</span>
        </p>
      </Link>

      <div className="flex flex-1 items-center justify-center">
        <GlobalSearch />
      </div>
      <Tips />

      {/* using the GlobalSearch component that we have declared at the components folder */}
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
          {/* only show the user button only if we are indeed logged in */}
        </SignedIn>
        <MobileNav />
        {/* using the MobileNav component that we have declared at the components folder */}
      </div>
    </nav>
  );
};

export default Navbar;

// className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12"
// flex-between: This class name suggests that it creates a flex container with space between the items.
// background-light900_dark200: Sets the background color or background design for the navigation bar with specific light and dark colors or gradients.
// fixed: Makes the navigation bar fixed so that it remains at the top of the viewport even when the page is scrolled.
// z-50: Sets the z-index to 50, determining the stacking order of elements. Elements with a higher z-index are displayed in front of those with a lower z-index.
// w-full: Makes the navigation bar take up the full width of the viewport.
// gap-5: Adds a gap or margin of 5 units between child elements.
// p-6: Adds padding of 6 units to all sides of the navigation bar.
// shadow-light-300 dark:shadow-none: Sets a shadow style, which varies based on the dark mode or light mode (responsive styling).
// sm:px-12: On small devices and larger, adds padding of 12 units to the left and right sides of the navigation bar.

// className="flex items-center gap-1"
// flex items-center gap-1: Creates a flex container with items aligned in a row, and a gap of 1 unit between child elements.

// className="h2-bold font-spaceGrotesk text-purple-800 dark:text-purple-500 max-sm:hidden"
// h2-bold: Applies bold styling to the h2 element.
// font-spaceGrotesk: Sets a specific font family.
// text-purple-800 dark:text-purple-500: Sets the text color with specific light and dark text colors.
// max-sm:hidden: Hides the text on screens with a maximum width of small (responsive styling).

// className="flex-between gap-5"
// flex-between: This class is not part of standard CSS, but it suggests that it's used to create a flex container with space or alignment between the items. It's a custom class that presumably defines the flex properties to distribute the child elements evenly with space in between them.
// gap-5: This class adds a margin or gap of 5 units between the child elements inside the flex container. It specifies the space between these elements. This is often used to control the spacing or layout of items inside a flex container.
