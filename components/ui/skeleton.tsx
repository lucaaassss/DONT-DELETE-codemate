import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-purple-500/50 dark:bg-purple-950/50",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
