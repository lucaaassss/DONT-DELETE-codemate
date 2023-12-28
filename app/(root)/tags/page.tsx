// this page will render all tags available in the website
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.actions";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | Codemate",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />
        {/* otherClasses is the classes for other pages because we will use this local searchbar component at different pages */}
        <Filter
          // this UserFilters is a constant retrieved from the constants > filters.ts file because we will use this filter in different pages
          // otherClasses is the classes for other pages because we will use this local searchbar component at different pages
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]" // styles for this specific filter
        />
      </div>

      <section className="mt-12 flex w-full flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`} // will redirect to each respective tag details page if clicked
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200  flex w-full flex-col rounded-2xl px-9 py-10 sm:w-[260px]">
                <div className="w-[260px] overflow-hidden">
                  <div className="w-[185px] rounded-sm bg-purple-300 px-5 py-1.5 dark:bg-purple-800">
                    <p className="paragraph-semibold text-dark300_light900 text-center">
                      {tag.name}
                    </p>
                  </div>
                  <p className="small-medium text-dark400_light500 mt-3.5">
                    <span className="body-semibold mr-2.5 text-purple-950 dark:text-light-500">
                      {tag.questions.length} Questions
                    </span>
                  </p>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="No tags? Be the pioneer! Start the buzz on this fresh topic and let the fun conversations begin!🚀🌟"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>
      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1} // we do +searchParams because thing from searchParams is usually in string so we want to convert it into a number
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
