"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`); // will route to the edit question page
  };

  const handleDelete = async () => {
    if (type === "Question") {
      // delete question
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
      toast({
        title: "Question Deleted",
        variant: "destructive",
        description: "Question has been successfully deleted.",
      });
    } else if (type === "Answer") {
      // delete answer
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });

      toast({
        title: "Answer Deleted",
        variant: "destructive",
        description: "Answer has been successfully deleted.",
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}
      <Image
        src="/assets/icons/bin.svg"
        alt="Delete"
        width={16}
        height={16}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
};

export default EditDeleteAction;
