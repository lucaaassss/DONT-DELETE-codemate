import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";

// _id is a common practice of naming id when we want to connect to the database
const hotQuestions = [
  { _id: "1", title: "Famous UI libraries recommendations" },
  { _id: "2", title: "How do I connect my application to MongoDB?" },
  { _id: "3", title: "What is Hook in React?" },
  { _id: "4", title: "Proper way to use async/await functions" },
  { _id: "5", title: "How do I use express as a custom server in Next.js?" },
];

const popularTags = [
  { _id: "1", name: "C++", totalQuestions: 3 },
  { _id: "2", name: "Java", totalQuestions: 5 },
  { _id: "3", name: "JavaScript", totalQuestions: 10 },
  { _id: "4", name: "React", totalQuestions: 7 },
  { _id: "4", name: "Next.js", totalQuestions: 15 },
];

const RightSidebar = () => {
  return (
    <section
      className="custom-scrollbar background-light900_dark200  sticky right-0 top-0 flex h-screen w-[350px] 
      flex-col  overflow-y-auto  p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      {/* use div to create a section */}
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/questions/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>

              {/* for arrow icon */}
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;

// className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden"
// custom-scrollbar: Likely custom styling for the scrollbar in the section.
// background-light900_dark200: Sets the background color or background design for the section with specific light and dark colors or gradients.
// light-border: Adds a light-colored border to the section.
// sticky right-0 top-0: Makes the section stick to the right and top of the viewport.
// flex h-screen w-[350px]: Makes the section a flex container that takes up the full screen height and has a fixed width of 350 pixels.
// flex-col: Arranges the children of the section in a column.
// overflow-y-auto: Enables vertical scrolling for the section when its content overflows.
// border-l: Adds a border to the left side of the section.
// p-6 pt-36: Adds padding to the section, including 6 units of padding on all sides and an additional 36 units of padding on the top.
// shadow-light-300 dark:shadow-none: Sets a shadow style, which varies based on the dark mode or light mode (responsive styling).
// max-xl:hidden: Hides the section on screens with a maximum width of extra-large (responsive styling).

// className="h3-bold text-dark200_light900"
// h3-bold: Applies bold styling to the h3 element.
// text-dark200_light900: Sets the text color for the element with a combination of dark and light text colors.

// className="mt-7 flex w-full flex-col gap-[30px]"
// mt-7: Adds margin to the top of the div.
// flex w-full flex-col gap-[30px]: Makes the div a flex container that takes up the full width, arranges its children in a column, and adds a specific gap between child elements.

// className="flex cursor-pointer items-center justify-between gap-7"
// flex: Makes the link a flex container, which allows arranging its children horizontally.
// cursor-pointer: Changes the cursor to a pointer on hover, indicating it's clickable.
// items-center: Centers the content vertically within the link.
// justify-between: Distributes the content evenly between the start and end of the link.
// gap-7: Adds a gap of 7 units between child elements for spacing.

// className="invert-colors"
// invert-colors:Applies the invert-colors class to the image, which likely inverts the colors of the image for a consistent appearance.

// the RenderTag component likely has its own CSS styles defined in the RenderTag component
