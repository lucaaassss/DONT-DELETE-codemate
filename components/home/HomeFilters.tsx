"use client"; // since we are using onClick

import React from "react";
import { Button } from "../ui/button";
import { HomePageFilters } from "@/constants/filters";

const HomeFilters = () => {
  const active = "newest";
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? " bg-primary-100 text-purple-600 dark:bg-yellow-500 dark:text-black"
              : "bg-light-800 text-light-500"
          }`}
        >
          {item.value}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
