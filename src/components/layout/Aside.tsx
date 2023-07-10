import { cn } from "@/lib/utils";
import Image from "next/image";

type AsideType = {
  className?: string;
};

const Aside = ({ className }: AsideType) => {
  const tags = [
    "Picture",
    "Fintech",
    "Food",
    "Technology",
    "Events",
    "Screen",
    "Activity",
    "Media",
    "Movie"
  ];
  return (
    <aside
      className={cn(
        "grid grid-rows-[auto_minmax(auto,_1fr)_minmax(auto,_240px)] gap-y-10 overflow-y-scroll bg-white p-10 text-sm rounded-2xl",
        className
      )}
      style={{ scrollbarGutter: "stable" }}
    >
      <div>
        <div className="relative aspect-square">
          <Image
            alt="avatar"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            fill
            sizes="*"
          />
        </div>

        <div className="py-2.5">
          <h3 className="text-lg font-bold">Anne Lee</h3>
          <p className=" text-gray-400">Product Lead / Designer at Framer</p>
          <a href="" target="_blank" className="mt-4 block text-purple-700">
            https://twitter.com/anneshlee
          </a>
        </div>
      </div>

      <div>
        <h4 className="mb-3.5 font-bold">Recommended Topics</h4>
        <ul className="flex flex-wrap gap-x-1.5 gap-y-2.5">
          {tags.map((tag) => {
            return (
              <li className="rounded-3xl bg-gray-200/60 px-4 py-1.5" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="row-start-3">
        <h4 className="mb-3.5 font-bold">Subscribe</h4>
        {Array.from({ length: 1 }, (_, index) => () => []).map((_, index) => {
          return (
            <p key={index}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem velit modi a aperiam quaerat illum deserunt? Et
              cupiditate minima consequatur, corrupti odio ab illum iste totam?
              Facere temporibus doloribus debitis?
            </p>
          );
        })}
      </div>
    </aside>
  );
};

export default Aside;
