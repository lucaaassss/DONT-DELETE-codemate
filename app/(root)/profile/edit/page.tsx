import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

const Page = async ({ params }: ParamsProps) => {
  // params is coming from ParamsProps
  const { userId } = auth(); // get the userId from clerk

  if (!userId) return null;

  const mongoUser = await getUserById({ userId }); // passed in an object containing the userId

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mt-5">Edit Profile</h1>
      <div className="mt-9">
        <Profile
          clerkId={userId} // passed in the clerkId
          user={JSON.stringify(mongoUser)} // passed in the user
          // we stringify it because we want to pass it to the profile component which is a client component.Only plain object can be passed to client component without being stringified.In our case,we have a complex object so that's why we have to stringify it
        />
      </div>
    </>
  );
};

export default Page;
