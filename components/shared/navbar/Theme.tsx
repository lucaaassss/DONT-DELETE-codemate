"use client";

import React from "react";
import Image from "next/image";

import { useTheme } from "@/context/ThemeProvider";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-purple-200 data-[state=open]:bg-purple-200 dark:focus:bg-purple-950 dark:data-[state=open]:bg-purple-950">
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border border-pink-500 bg-pink-200 py-2 dark:border-pink-500 dark:bg-pink-300">
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex items-center gap-4 px-2.5 py-2 focus:bg-pink-500 dark:focus:bg-pink-600"
              // when we click
              onClick={() => {
                setMode(item.value);
                if (item.value !== "system") {
                  // check if the item value does not match the system theme preference
                  // system means our local machine theme preference
                  localStorage.theme = item.value; // set the localStorage to the selected theme
                } else {
                  localStorage.removeItem("theme"); // if it matches,we will be using the theme from the local machine
                }
              }}
            >
              <Image
                src={item.icon} // these are all the theme constants retrieved from the constant folder
                alt={item.value}
                width={16}
                height={16}
                className={`${mode === item.value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? "text-pink-700"
                    : "text-dark100_light900" // this is from the class in the styles folder
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;

// className="relative border-none bg-transparent shadow-none"
// relative: Positions the Menubar relative to its normal position in the document flow.
// border-none: Removes any borders from the Menubar.
// bg-transparent: Sets the background of the Menubar to be transparent.
// shadow-none: Removes any box shadow or drop shadow from the Menubar.

// className="focus:bg-purple-200 data-[state=open]:bg-purple-200 dark:focus:bg-purple-950 dark:data-[state=open]:bg-purple-950"
// MenubarTrigger: This element is part of the Menubar component, likely used to trigger a menu.
// focus:bg-purple-200: Sets the background color when the element is in focus.
// data-[state=open]:bg-purple-200: Sets the background color when the data state is open.
// dark:focus:bg-purple-950: Sets the background color in dark mode when the element is in focus.
// dark:data-[state=open]:bg-purple-950: Sets the background color in dark mode when the data state is open.

// className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border border-pink-500 bg-pink-200 py-2 dark:border-pink-500 dark:bg-pink-300"
// MenubarContent: This is the content of the Menubar when the menu is open.
// absolute: Positions the MenubarContent absolutely, relative to the nearest positioned ancestor.
// right-[-3rem]: Shifts the MenubarContent 3 units to the right.
// mt-3: Adds margin to the top of the MenubarContent.
// min-w-[120px]: Sets a minimum width of 120 pixels for the MenubarContent.
// rounded: Applies rounded corners to the MenubarContent.
// border border-pink-500: Adds a border with a pink color.
// bg-pink-200: Sets the background color to a shade of pink.
// py-2: Adds padding of 2 units to the top and bottom.
// dark:border-pink-500 dark:bg-pink-300: Sets border and background colors in dark mode.

// className="flex items-center gap-4 px-2.5 py-2 focus:bg-pink-500 dark:focus:bg-pink-600"
// flex items-center gap-4: Creates a flex container with items centered and a gap of 4 units between child elements.
// px-2.5 py-2: Adds padding to the left and right (2.5 units) and top and bottom (2 units).
// focus:bg-pink-500 dark:focus:bg-pink-600: Sets the background color when the item is in focus or in focus in dark mode.
