"use client";

import { useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import PostEditorForm from "../form/PostEditorForm";
import { cn } from "@/lib/utils";
import PostView from "../post/PostReview";

enum ModalState {
  Edit = "Edit",
  Preview = "Preview"
}

const NewPostModal = () => {
  const [state, setState] = useState<String>(ModalState.Edit);
  const [open, setOpen] = useState(false);

  const stateButtons = [
    {
      label: ModalState.Edit,
      onClick: () => {
        setState(ModalState.Edit);
      }
    },
    {
      label: ModalState.Preview,
      onClick: () => {
        setState(ModalState.Preview);
      }
    }
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const getPostReviewData = () => {
    const tempPostDataString = localStorage.getItem("tempPostData") ?? "";
    let tempData = tempPostDataString && JSON.parse(tempPostDataString);
    return tempData;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="hover:border-purple-700 hover:bg-transparent hover:text-purple-700"
        >
          New Post
        </Button>
      </DialogTrigger>

      <DialogContent
        className="flex h-[100dvh] max-w-[100dvw] flex-col bg-gray-50"
        onOpenAutoFocus={() => {
          setState(ModalState.Edit);
        }}
      >
        <DialogHeader className="max-h-fit">
          <DialogTitle className="text-center">New Post</DialogTitle>
        </DialogHeader>

        <DialogDescription className="space-x-2 text-center">
          {stateButtons.map((btn) => (
            <Button
              key={btn.label}
              variant={"outline"}
              className={cn(btn.label === state && "text-purple-700")}
              onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          ))}
        </DialogDescription>

        <div className="mx-auto w-full max-w-[950px] flex-1 overflow-y-auto rounded-2xl bg-white px-16 py-10">
          {state === ModalState.Edit && (
            <PostEditorForm onClose={handleClose} />
          )}
          {state === ModalState.Preview && <PostView data={getPostReviewData()} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostModal;
