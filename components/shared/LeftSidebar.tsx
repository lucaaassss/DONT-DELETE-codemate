"use client"; // use client side because we want to use hooks

import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { SignedOut, useAuth } from "@clerk/nextjs";

const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  return (
    // section is what create the container for the sidebar, do note that we dont use sheet from the shad/cn component as it needs to be triggered by a button to display the content, we want our sidebar content to always be displayed
    // do note that the section element does not apply any specific styling or layout. Its appearance is controlled through CSS.
    <section
      className="custom-scrollbar background-light900_dark200 sticky left-0 top-0 flex h-screen w-fit flex-col 
    justify-between  overflow-y-auto  p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"
    >
      {/* all of this item is retrieved from the constant > index.ts file */}
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          // checking the current path name or url
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route; // item.route.length>1 means that if the route exists

          if (item.route === "/profile") {
            if (userId) {
              item.route = `${item.route}/${userId}`; // we take the current item.route and add the user id to it.For example if the user click on the profile option,the item route will be localhost:3000/profile/fukyfgvh.fukyfgvh is the example of user id
            } else {
              return null;
            }
          }
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
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
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />{" "}
              {/* lg:hidden means that the icon will be hidden on large devices,it will only show on small devices */}
              <span className="text-white dark:text-black max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 text-purple-600 shadow-none dark:text-black">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="sign up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;

// className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"
// custom-scrollbar: Likely custom styling for the scrollbar in the section.
// background-light900_dark200: Sets the background color or background design for the section with specific light and dark colors or gradients.
// light-border: Adds a light-colored border to the section.
// sticky left-0 top-0: Makes the section stick to the left and top of the viewport.
// flex h-screen w-fit flex-col justify-between: Makes the section a flex container that takes up the full screen height, has a width that fits its content, and arranges its children in a column while justifying the content between its start and end.
// overflow-y-auto: Enables vertical scrolling for the section when its content overflows.
// border-r: Adds a border to the right side of the section.
// p-6 pt-36: Adds padding to the section, including 6 units of padding on all sides and an additional 36 units of padding on the top.
// shadow-light-300 dark:shadow-none: Sets a shadow style, which varies based on the dark mode or light mode (responsive styling).
// max-sm:hidden: Hides the section on screens with a maximum width of small (responsive styling).
// lg:w-[266px]: Sets a width of 266 pixels for large screens (responsive styling).

// className="flex flex-1 flex-col gap-6"
// flex: Makes the div element a flex container.
// flex-1: Makes the div element take up all available vertical space.
// flex-col: Arranges the children of the div element in a column.
// gap-6: Adds a gap of 6 units between child elements for spacing.

// for the links:
// primary-gradient: Sets a primary gradient background for active links.
// rounded-lg: Applies rounded corners to links.
// text-light-900 and text-dark300_light900: Sets the text color for active and non-active links.
// bg-transparent: Sets a transparent background for links.
// p-4: Adds padding to links.

// for the icons:
// invert-colors: Likely inverts the colors of icons for non-active links.

// for the login
// className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
// small-medium: It might determine the size of the button, making it relatively small to medium-sized.
// btn-secondary: Sets the button style to a secondary style, indicating that it's not the primary action.
// min-h-[41px]: Sets a minimum height of 41 pixels for the button, ensuring it's at least a certain height.
// w-full: Makes the button take up the full available width, ensuring it spans the entire width of its container.
// rounded-lg: Applies rounded corners to the button, creating a rounded appearance.
// px-4 py-3: Adds padding of 4 units on the left and right and 3 units on the top and bottom to the button.
// shadow-none: Removes any box shadow or drop shadow from the button, making it appear without a shadow.

// className="primary-text-gradient max-lg:hidden"
// primary-text-gradient: Likely sets the text color to a primary gradient.
// max-lg:hidden: Hides the text on large devices.

// for the signup
// className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
// small-medium: Determines the size of the button, making it relatively small to medium-sized.
// light-border-2: Applies a light-colored border style to the button.
// btn-tertiary: Sets the button style to tertiary, indicating it's a secondary action.
// text-dark400_light900: Sets the text color of the button.
// min-h-[41px]: Specifies a minimum height of 41 pixels for the button.
// w-full: Makes the button take up the full available width.
// rounded-lg: Applies rounded corners to the button.
// px-4 py-3: Adds padding to the button.
// shadow-none: Removes any box shadow from the button.

// className="max-lg:hidden"
// max-lg:hidden: Hides the text on large devices.
