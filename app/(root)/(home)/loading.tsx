import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient dark:primary-gradient-dark min-h-[46px] px-4 py-3 !text-light-900">
            {/* exclamation mark ! is sometimes used to style shadcn component to mark it as important because otherwise the styles are not gonna get applied */}
            Ask a Question
          </Button>
        </Link>
      </div>
      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      <div className="my-10 hidden flex-wrap gap-6 md:flex">
        <Skeleton className="h-11 w-40" />
        <Skeleton className="h-11 w-40" />
        <Skeleton className="h-11 w-40" />
        <Skeleton className="h-11 w-40" />
      </div>

      <div className="flex flex-col gap-6">
        {[1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-48 w-full rounded-[50px]" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
