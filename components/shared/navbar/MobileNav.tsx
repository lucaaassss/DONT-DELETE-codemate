"use client"; // use client side because we want to use hooks

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();
  // this component will be reused across the application
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {/* all of this item is retrieved from the constant folder */}
      {sidebarLinks.map((item) => {
        // checking the current path name or url
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route; // item.route.length>1 means that if the route exists
        return (
          <SheetClose asChild key={item.route}>
            {/* asChild means we will pass something into it so that it will show that something */}
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient dark:primary-gradient-dark rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent side="left">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={40}
            height={40}
            alt="Codemate"
          />
          <p className="h2-bold text-dark100_light900 font-spaceGrotesk ">
            ode
            <span className="text-purple-500 dark:text-purple-300">mate</span>
          </p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="text-white dark:text-dark-300">
                      Log In
                    </span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 text-purple-600 shadow-none dark:text-dark-300">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

// className="flex h-full flex-col gap-6 pt-16"
// flex: Makes the section a flex container, allowing its child elements to be laid out in a flexbox fashion.
// h-full: Sets the height of the section to be 100% of its parent container's height (full height).
// flex-col: Arranges the child elements within the section in a column layout.
// gap-6: Adds a gap of 6 units between child elements for spacing.
// pt-16: Adds padding to the top of the section, with a value of 16 units.

// className={`${
//   isActive
//  /  ? "primary-gradient rounded-lg text-light-900"
//     : "text-dark300_light900"
// } flex items-center justify-start gap-4 bg-transparent p-4`}
// className: Conditionally applies styles to the link based on whether it's active or not.
// Conditional styles for the link:

// primary-gradient: Likely applies a gradient effect with primary colors.
// rounded-lg: Applies rounded corners with a rounded border to the link.
// text-light-900: Sets the text color to a specific light color if the link is active.
// text-dark300_light900: Sets the text color to a specific dark and light color combination if the link is not active.
// flex: Makes the link a flex container.
// items-center: Centers the content vertically within the link.
// justify-start: Aligns the content to the start of the link.
// gap-4: Adds a gap of 4 units between child elements for spacing.
// bg-transparent: Sets the background of the link to be transparent.
// p-4: Adds padding of 4 units to all sides of the link.

// className="invert-colors sm:hidden"
// invert-colors: Likely inverts the colors of the image for a consistent appearance.
// sm:hidden: Hides the image on screens with a small viewport width or larger.

// className="flex items-center gap-1"
// flex: Makes the link a flex container.
// items-center: Centers the content vertically within the link.
// gap-1: Adds a gap of 1 unit between child elements for spacing.

// className="h2-bold text-dark100_light900 font-spaceGrotesk "
// h2-bold: Applies bold styling to the p element.
// text-dark100_light900: Sets the text color for the element with a combination of dark and light text colors.
// font-spaceGrotesk: Sets the font-family to "Space Grotesk."

// className="flex flex-col gap-3"
// flex flex-col gap-3: Makes the div a flex container with a column layout and adds a gap of 3 units between child elements for spacing.

// className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
// small-medium: Sets the button to have small size and medium font weight.
// btn-secondary: Likely a secondary button style.
// min-h-[41px]: Sets a minimum height of 41 pixels for the button.
// w-full: Makes the button take up the full width.
// rounded-lg: Applies rounded corners with a rounded border to the button.
// px-4 py-3: Adds padding to the left and right (4 units) and top and bottom (3 units) of the button.
// shadow-none: Removes any box shadow or drop shadow from the button.

// className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
// small-medium: Sets the button to have small size and medium font weight.
// light-border-2: Likely a button style with a light-colored border and border width of 2 units.
// btn-tertiary: Likely a tertiary button style.
// text-dark400_light900: Sets the text color with specific dark and light text colors.
// min-h-[41px]: Sets a minimum height of 41 pixels for the button.
// w-full: Makes the button take up the full width.
// rounded-lg: Applies rounded corners with a rounded border to the button.
// px-4 py-3: Adds padding to the left and right (4 units) and top and bottom (3 units) of the button.
// shadow-none: Removes any box shadow or drop shadow from the button.
