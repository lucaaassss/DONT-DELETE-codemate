import { formatNumber } from "@/lib/utils";
import { BadgeCounts } from "@/types";
import Image from "next/image";

// since this stats card component is only going to be used here,we just declare it here instead of declaring it in another component
interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}
const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
  return (
    <div className="background-light900_dark300 flex flex-wrap items-center justify-start gap-4 rounded-md  p-6 ">
      <Image src={imgUrl} alt={title} width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
};

interface Props {
  totalQuestions: number;
  totalAnswers: number;
  badges: BadgeCounts;
}

const Stats = ({ totalQuestions, totalAnswers, badges }: Props) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900"> Stats:</h4>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md p-6 ">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>

          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>

        <StatsCard
          imgUrl="/assets/icons/trophyfirst.svg"
          value={badges.GOLD}
          title="CodeMaster Trophy"
        />

        <StatsCard
          imgUrl="/assets/icons/trophysec.svg"
          value={badges.SILVER}
          title="Master Trophy"
        />

        <StatsCard
          imgUrl="/assets/icons/trophythird.svg"
          value={badges.BRONZE}
          title="Novice Trophy"
        />
      </div>
    </div>
  );
};

export default Stats;
