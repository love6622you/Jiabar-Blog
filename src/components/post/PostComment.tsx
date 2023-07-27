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
import { getTimeAgo } from "@/lib/utils";
import { IComment } from "@/types";

type PostCommentType = {
  data: IComment[];
};

export function PostComment({ data }: PostCommentType) {
  const length = data?.length ?? 0;
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
          {data?.map((comment: IComment) => (
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
