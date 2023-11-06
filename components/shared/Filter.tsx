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
  return (
    <div className={`relative ${containerClasses}`}>
      <Select>
        <SelectTrigger
          className={`${otherClasses} primary-gradient min-h-[46px] border-none px-4 py-3 !text-light-900 `}
        >
          {" "}
          {/* otherClasses is the classes for other pages because we will use this local searchbar component at different pages */}
          {/* line clamp-1 will make the overflow hidden and display Webkit box */}
          <div className=" line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="primary-darker-gradient border-none !text-light-900 ">
            {filters.map((item) => (
              <SelectItem key={item.value} value={item.value}>
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
