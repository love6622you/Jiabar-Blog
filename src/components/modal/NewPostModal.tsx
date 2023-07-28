"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import PostEditorForm from "../form/PostEditorForm";
import { cn } from "@/lib/utils";
import PostView from "../post/PostReview";

type NewPostModal = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

enum ModalState {
  EDIT = "Edit",
  PREVIEW = "Preview"
}

const NewPostModal = ({ open, setOpen }: NewPostModal) => {
  const [state, setState] = useState<string>(ModalState.EDIT);

  const stateButtons = [
    {
      label: ModalState.EDIT,
      onClick: () => {
        setState(ModalState.EDIT);
      }
    },
    {
      label: ModalState.PREVIEW,
      onClick: () => {
        setState(ModalState.PREVIEW);
      }
    }
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const getPostReviewData = () => {
    const tempPostDataString = localStorage.getItem("tempPostData") ?? "";
    const tempData = tempPostDataString && JSON.parse(tempPostDataString);
    return tempData;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={"outline"}
          className="hover:border-purple-700 hover:bg-transparent hover:text-purple-700"
        >
          New Post
        </Button>
      </DialogTrigger>

      <DialogContent
        className="flex h-[100dvh] max-w-[100dvw] flex-col bg-gray-50"
        onOpenAutoFocus={() => {
          setState(ModalState.EDIT);
        }}
      >
        <DialogHeader className="flex-row items-center gap-3.5 md:flex-col">
          <DialogTitle className="text-center">New Post</DialogTitle>
          <DialogDescription className="space-x-2 space-y-0 text-center">
            {stateButtons.map((btn) => (
              <Button
                key={btn.label}
                size={"sm"}
                variant={"outline"}
                className={cn(btn.label === state && "text-purple-700")}
                onClick={btn.onClick}
              >
                {btn.label}
              </Button>
            ))}
          </DialogDescription>
        </DialogHeader>

        <div className="mx-auto w-full max-w-[950px] flex-1 overflow-y-auto rounded-2xl bg-white px-8 py-5 md:px-16 md:py-10">
          {state === ModalState.EDIT && <PostEditorForm onClose={handleClose} />}
          {state === ModalState.PREVIEW && <PostView data={getPostReviewData()} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostModal;
