import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { BiMessage } from "react-icons/bi";

import Image from "next/image";
import { CommentForm } from "../form/CommentForm";
import { UseQueryResult } from "@tanstack/react-query";
import { getTimeAgo } from "@/lib/utils";

type CommentDataType = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    image: string;
  };
};

type PostCommentType = {
  source: UseQueryResult<CommentDataType[]>;
};

export function PostComment({ source }: PostCommentType) {
  const { data: comments, isLoading } = source;
  const length = comments?.length ?? 0;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="group cursor-pointer">
          <BiMessage className="inline-block h-6 w-8 group-hover:text-orange-400" />
          <span>{length} Comments</span>
        </div>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Comments ({length})</SheetTitle>
        </SheetHeader>

        <CommentForm />
        <hr className="mt-8" />
        <ul className="divide-y">
          {isLoading && <div>isLoading...</div>}
          {!isLoading &&
            comments?.map((comment: CommentDataType) => (
              <li key={comment.id} className="py-6">
                <div className="mb-4 flex items-center gap-x-2.5">
                  <Image
                    className="h-10 w-10 rounded-full"
                    alt="avatar"
                    src={comment.user.image}
                    width={40}
                    height={40}
                  />
                  <div className="space-y-0.5">
                    <p>{comment.user.name}</p>
                    <p className="text-gray-400">
                      {getTimeAgo(comment?.createdAt)}
                    </p>
                  </div>
                </div>
                <p>{comment?.content}</p>
              </li>
            ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
