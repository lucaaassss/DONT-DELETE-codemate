import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "Famous UI libraries recommendations",
    tags: [
      { _id: "1", name: "NEXT.JS" },
      { _id: "2", name: "REACT" },
    ],
    author: { _id: "1", name: "Shahirul", picture: "shahirul.jpg" },
    upvotes: 1055,
    views: 500,
    answers: [],
    createdAt: new Date("2023-11-07T12:00:00.00Z"),
  },
  {
    _id: "2",
    title: "How do I connect my application to MongoDB",
    tags: [
      { _id: "1", name: "MONGODB" },
      // { _id: "2", name: "NEXT.JS" },
    ],
    author: { _id: "1", name: "Gwen", picture: "gwen.jpg" },
    upvotes: 50000,
    views: 100000,
    answers: [],
    createdAt: new Date("2023-09-01T12:00:00.00Z"),
  },
];
export default function Home() {
  return (
    // Fragments
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        {/* sm means small devices and larger */}
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            {/* exclamation mark ! is sometimes used to style shadcn component to mark it as important because otherwise the styles are not gonna get applied */}
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        {/* otherClasses is the classes for other pages because we will use this local searchbar component at different pages */}
        <Filter
          // this HomePageFilters is a constant retrieved from the constants folder because we will use this filter in different pages
          // otherClasses is the classes for other pages because we will use this local searchbar component at different pages
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="text-dark200_light900 mt-10 flex w-full flex-col gap-6">
        {/* Looping through questions */}
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There are no questions to show"
            description="Take the lead in ending the silence! Ask a question and be the catalyst for a meaningful conversation. Your query could inspire others. Get in on it! 🚀"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}

// className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center"
// flex w-full flex-col-reverse justify-between gap-4: Makes the div a flex container that spans the full width of its parent, arranges its children in a column with a gap of 4 units between them, and justifies content between the start and end of the container.
// sm:flex-row: On small devices and larger, this class arranges the children in a row (horizontally) instead of a column.
// sm:items-center: On small devices and larger, this class centers the content vertically.

// className="h1-bold text-dark100_light900"
// h1-bold: Applies bold styling to the h1 element.
// text-dark100_light900: Sets the text color for the element with a combination of dark and light text colors.

// className="flex justify-end max-sm:w-full"
// flex justify-end: Arranges the Link component's content (the button) to the right within the link container.
// max-sm:w-full: Sets the maximum width to the full width on screens with a maximum width of small (responsive styling).

// className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
// primary-gradient: Sets a primary gradient background for the button.
// min-h-[46px]: Sets a minimum height of 46 pixels for the button.
// px-4 py-3: Adds padding to the left and right sides (4 units) and top and bottom (3 units) of the button.
// / !text-light-900: The exclamation mark ! indicates that the !text-light-900 class is marked as important, ensuring that the styles get applied.

// className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"
// mt-11: Adds margin to the top of the div.
// flex justify-between gap-5: Makes the div a flex container that justifies its children between the start and end and adds a gap of 5 units between them.
// max-sm:flex-col: On screens with a maximum width of small (responsive styling), arranges children in a column.
// sm:items-center: On small devices and larger, centers the content vertically.

// flex-1
// this class is often used to indicate that an element should take up all available space within a flex container. It's a shorthand way of setting the flex-grow property to 1. This means that the element will expand and occupy the remaining space within the container, pushing other elements aside if needed. In other words, it helps distribute available space evenly among flex items.
// for example, if we have two elements in a flex container, and one has the flex-1 class while the other does not, the element with flex-1 will grow and take up more space, ensuring that the available space is used effectively.
