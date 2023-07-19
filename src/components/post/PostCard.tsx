import { cn, getTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type PostCardType = {
  post: any;
};
const PostCard = ({ post }: PostCardType) => {
  const timeAgo = getTimeAgo(post.createdAt);
  return (
    <article
      key={post.id}
      className="group relative mb-4 cursor-pointer bg-white transition hover:shadow-xl"
    >
      <Link
        className="absolute inset-0 z-0"
        href={{
          pathname: `/post/${post.id}`
        }}
      />

      <div className={cn("mx-10 py-10", ["pt-5"])}>
        <div className="mb-4 flex items-center gap-x-2">
          <Image
            className="inline-block h-10 w-10 rounded-full"
            alt="avatar"
            src={post.user.image}
            width={40}
            height={40}
          />
          <p>
            {post.user.name} , {timeAgo}
          </p>
        </div>

        <div className="flex">
          <div className="relative hidden sm:block sm:basis-60">
            <Image
              alt="Guitar"
              src={post.image}
              className="object-cover"
              fill
              sizes="*"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between gap-10 px-4 sm:px-6">
            <div className="border-s border-gray-700/10 sm:border-l-transparent">
              <Link href="#">
                <h3 className="text-xl font-bold text-gray-700">
                  {post.title}
                </h3>
              </Link>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                {post.content}
              </p>
            </div>

            <div className="flex justify-start gap-x-3">
              {post.tags.map((tag: any) => {
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
