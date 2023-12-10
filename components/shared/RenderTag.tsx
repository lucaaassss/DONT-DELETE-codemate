// this is a dynamic reusable component
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number; // the question symbol ? means that it is optional
  showCount?: boolean;
}

// meaning that it will be a type of Props,we can name it whatever we want
const RenderTag = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link
      href={`/tags/${_id}`}
      key={_id}
      className="flex justify-between gap-2"
    >
      {/* meaning that the link will change based on the id */}
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {name}
      </Badge>

      {/* if variable showCount is available,then we display totalQuestions */}
      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestions}</p>
      )}
    </Link>
  );
};

export default RenderTag;

// className="flex justify-between gap-2"
// flex: This class makes the container a flex container. In a flex container, its child elements can be easily arranged in a row (horizontally) or column (vertically) and adjusted based on available space.
// justify-between: This class is often used in conjunction with a flex container. It instructs the flex container to distribute its child elements so that there is space between them, pushing them apart. In this case, it will push the child elements to the left and right edges of the container.
// gap-2: This class adds a gap of 2 units between the child elements within the flex container. The gap is essentially spacing added to the left and right of each child element, providing visual separation between them.

// className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase"
// subtle-medium: Sets the badge style to be subtle with medium font weight.
// background-light800_dark300: Sets the background color or design with specific light and dark colors or gradients.
// text-light400_light500: Sets the text color with specific light and dark text colors.
// rounded-md: Applies rounded corners with a rounded border to the badge.
// border-none: Removes any borders from the badge.
// px-4 py-2: Adds padding to the left and right sides (4 units) and top and bottom (2 units) of the badge.
// uppercase: Transforms the text to uppercase.

// className="small-medium text-dark500_light700"
// small-medium: Sets the text to be of small size with medium font weight.
// text-dark500_light700: Sets the text color with specific dark and light text colors.
