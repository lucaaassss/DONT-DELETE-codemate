"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import React, { useState } from "react";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = async () => {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  };

  const handleDelete = async (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault(); // to prevent the browser from refreshing and to allow smooth deletion of answer
    setShowDeleteModal(true); // will initially display the confirmation message
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false); // regardless if the user choose yes or no,the confirmation message will be closed back

    if (type === "Question") {
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

  const cancelDelete = () => {
    setShowDeleteModal(false); // regardless if the user choose yes or no,the confirmation message will be closed back

    toast({
      title: "Delete Canceled",
      variant: "default",
      description: "Deletion process has been canceled.",
    });
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

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
          <div className="rounded-[25px] bg-white p-10 dark:bg-dark-300">
            <p className="mb-4 text-lg font-semibold text-dark-300 dark:text-white">
              Are you sure you want to delete?
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                className="mr-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="rounded-md bg-light-700 px-4 py-2 text-gray-800 hover:bg-gray-300"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDeleteAction;
