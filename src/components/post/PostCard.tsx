import { cn, getTimeAgo } from "@/lib/utils";
import { IPost } from "@/types";
import Image from "next/image";
import Link from "next/link";

type PostCardType = {
  post: IPost;
};

const PostCard = ({ post }: PostCardType) => {
  const timeAgo = getTimeAgo(post.createdAt);
  return (
    <article className="relative mb-2.5 cursor-pointer bg-white transition hover:shadow-xl">
      <Link
        className="absolute inset-0 z-10"
        href={{
          pathname: `/post/${post.id}`
        }}
      />

      <div className={cn("relative mx-10 pb-10 pt-5")}>
        <div className="mb-4 flex items-center gap-x-2">
          <Image
            className="inline-block h-10 w-10 rounded-full"
            alt="avatar"
            src={post.author.image}
            width={40}
            height={40}
          />
          <p>
            {post.author.name} , {timeAgo}
          </p>
        </div>

        <div className="flex gap-5 max-md:flex-col">
          <div className="block aspect-auto h-32 w-40 flex-shrink-0 self-center">
            <Image alt="postImage" src={post.image} className="h-full w-full object-cover" width={160} height={128} />
          </div>

          <div className="flex flex-1 flex-col justify-between gap-10">
            <div>
              <h3 className="line-clamp-3 text-xl font-bold text-gray-700">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">{post.content}</p>
            </div>

            <div className="flex justify-start gap-x-3">
              {post.tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700"
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
