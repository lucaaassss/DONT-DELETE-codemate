import { TipsOfTheDay } from "@/constants/tips";
import React from "react";

const Tips = () => {
  const randomTip =
    TipsOfTheDay[Math.floor(Math.random() * TipsOfTheDay.length)];

  return (
    <div className="ml-auto overflow-hidden rounded-[30px] bg-purple-800 p-4 text-white dark:bg-purple-400  dark:text-white max-lg:hidden">
      <h4 className="px-0 font-bold text-primary-100 dark:text-blue-800">
        Daily Prompt Tips🪄
      </h4>
      <div key={randomTip.title} className="flex">
        <h3 className="body-regular">
          {randomTip.title}: {randomTip.content}
        </h3>
      </div>
    </div>
  );
};

export default Tips;
