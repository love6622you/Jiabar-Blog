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

export function PostComment() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="group cursor-pointer">
          <BiMessage className="inline-block h-6 w-8 group-hover:text-orange-400" />
          <span>10 Comments</span>
        </div>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Comments (10)</SheetTitle>
        </SheetHeader>

        <CommentForm />
        <hr className="mt-8" />
        <ul className="divide-y">
          {Array.from({ length: 10 }).map((comment, index) => {
            return (
              <li key={index} className="py-6">
                <div className="mb-4 flex gap-x-2.5">
                  <Image
                    className="rounded-full"
                    alt="avatar"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    width={48}
                    height={48}
                  />
                  <div className="space-y-0.5">
                    <p>{"Name"}</p>
                    <p className="text-gray-400"> {"5 days ago"}</p>
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde
                  asperiores mollitia voluptas repudiandae animi, ex non natus
                  eum provident est iste eius ratione ipsam ipsa facilis
                  deserunt in nam ad!
                </p>
              </li>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
