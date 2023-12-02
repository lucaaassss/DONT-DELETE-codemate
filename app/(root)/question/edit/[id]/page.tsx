import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

const Page = async ({ params }: ParamsProps) => {
  // params is coming from ParamsProps
  const { userId } = auth(); // get the userId from clerk

  if (!userId) return null; // if user does not exist,return nothing

  const mongoUser = await getUserById({ userId }); // passed in an object containing the userId
  const result = await getQuestionById({ questionId: params.id }); // passed in the questionId which has the value of params id
  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mt-5">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id} // to know who is editing the question so that only the author can edit it
          questionDetails={JSON.stringify(result)} // passed all the details of the specific question so that we can edit it
        />
      </div>
    </>
  );
};

export default Page;
