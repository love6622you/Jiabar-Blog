"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/store/rootStore";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AuthorInfo = () => {
  const pathname = usePathname();

  const [isPostPage, setIsPostPage] = useState(false);
  const { post, setPost } = useStore((state) => state);

  useEffect(() => {
    if (/^\/post\/[^/]+$/.test(pathname)) {
      setIsPostPage(true);
    } else {
      setPost({});
      setIsPostPage(false);
    }
  }, [pathname]);

  return (
    <div className={cn(!isPostPage && "hidden")}>
      {post && post.author && (
        <>
          <div className="aspect-square w-full">
            <Image
              alt="avatar"
              src={post.author.image}
              width={400}
              height={400}
            />
          </div>

          <div className="py-2.5">
            <h3 className="text-lg font-bold">{post.author.name}</h3>
            <p className=" text-gray-400">(Personal description)</p>
            <a href="" target="_blank" className="mt-4 block text-purple-700">
              (Personal&apos;s website)
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthorInfo;
