import { cn } from '@/lib/utils';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const array = Array.from({ length: 10 }, () => []);
  return (
    <section>
      <div className="flex-center h-60 flex-col border-b">
        <div className="max-w-xl">
          <h2 className="pb-2 text-3xl font-bold">Explore, be curious.</h2>
          <p>
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>
      </div>

      <div className="mx-20 py-10">
        {array.map((_, index) => {
          return (
            <article
              key={index}
              className="group relative cursor-pointer transition hover:shadow-xl bg-white mb-4"
            >
              <Link
                className="absolute inset-0 z-0"
                href={{
                  pathname: `/post/${index}`
                }}
              />

              <div className={cn("mx-10 py-10", ["pt-5"])}>
                <div className="mb-4 flex items-center gap-x-2">
                  <Image
                    className="inline-block rounded-full "
                    alt="avatar"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    width={48}
                    height={48}
                  />
                  <p>Name</p>
                  <span className="h-1 w-1 rounded-full bg-black" />
                  <p>Nov 1, 2022</p>
                </div>

                <div className="flex">
                  <div className="relative hidden sm:block sm:basis-60">
                    <Image
                      alt="Guitar"
                      src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                      className="object-cover"
                      fill
                      sizes="*"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-10 px-4 sm:px-6">
                    <div className="border-s border-gray-700/10 sm:border-l-transparent">
                      <Link href="#">
                        <h3 className="text-xl font-bold text-gray-700">
                          Finding the right guitar
                        </h3>
                      </Link>

                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae dolores, possimus pariatur animi
                        temporibus nesciunt praesentium dolore sed nulla ipsum
                        eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                      </p>
                    </div>

                    <div className="flex justify-start">
                      <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700">
                        Live
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
