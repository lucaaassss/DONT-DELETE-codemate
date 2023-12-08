import UserCard from "@/components/cards/UserCard";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Codemate",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for users"
          otherClasses="flex-1"
        />
        {/* otherClasses is the classes for other pages because we will use this local searchbar component at different pages */}
        <Filter
          // this UserFilters is a constant retrieved from the constants > filters.ts file because we will use this filter in different pages
          // otherClasses is the classes for other pages because we will use this local searchbar component at different pages
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center font-bold">
            <p>No users yet</p>
            <Link
              href="/sign-up"
              className="mt-2 font-semibold text-blue-900 dark:text-blue-300"
            >
              Click here to be the first!
            </Link>
          </div>
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
