"use client";

import Editor from "@/components/post/Editor";
import Image from "next/image";
import { useParams } from "next/navigation";
import { AiOutlineEdit, AiOutlineComment, AiOutlineLike } from "react-icons/ai";

const PostDetail = () => {
  const slug = useParams()["slug"];

  return (
    <section>
      <div className="relative aspect-video">
        <Image
          className="object-cover"
          src={
            "https://images.unsplash.com/photo-1687026555266-c61e736a31f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8UzRNS0xBc0JCNzR8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
          alt="pic"
          fill
        />
      </div>
      <div className="mx-auto max-w-3xl px-10">
        <ul className="flex">
          <li>
            <AiOutlineEdit className="inline-block h-6 w-6 text-gray-500" />
            <span>Published in Hardware</span>
          </li>
          <li>
            <AiOutlineEdit className="inline-block h-6 w-6 text-gray-500" />
            <span>Published in Hardware</span>
          </li>
        </ul>

        <article>
          <h2>Title</h2>
          <span>Date</span>
          <div>
            <Editor />
          </div>
        </article>

        <ul className="flex gap-x-3">
          <li>
            <AiOutlineLike className="inline-block h-6 w-6 text-gray-500" />
            <span>Like (1)</span>
          </li>
          <li>
            <AiOutlineComment className="inline-block h-6 w-6 text-gray-500" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PostDetail;
