import { SearchParamsProps } from "@/types";

interface Props extends SearchParamsProps {
  // we extends because searchProps is coming from searchParamProps
  userId: string;
  clerkId?: string | null;
}
const AnswersTab = async ({ searchProps, userId, clerkId }: Props) => {
  return <div>AnswersTab</div>;
};

export default AnswersTab;
