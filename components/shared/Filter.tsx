// this is a dynamic reusable component
"use client"; // use client since we are working with select
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

// the bracket [] is to indicate that the filters is an array
interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={(value) => handleUpdateParams(value)}
        defaultValue={paramFilter || undefined} // default value can be according to the filter option selected or undefined
      >
        <SelectTrigger
          className={`${otherClasses} primary-gradient dark:primary-gradient-dark body-regular min-h-[46px] border-none px-5 py-2.5  !text-light-900 `}
        >
          {" "}
          {/* otherClasses is the classes for other pages because we will use this local searchbar component at different pages */}
          {/* line clamp-1 will make the overflow hidden and display Webkit box */}
          <div className=" line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="primary-darker-gradient dark:primary-darker-gradient-dark small-regular border-none text-white">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="cursor-pointer focus:bg-purple-800 dark:focus:bg-purple-300"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
