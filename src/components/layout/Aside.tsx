import { cn } from "@/lib/utils";
import RecommendedTopic from "./aside/RecommendedTopic";
import AuthorInfo from "./aside/AuthorInfo";

type AsideType = {
  className?: string;
};

const Aside = ({ className }: AsideType) => {
  return (
    <aside
      className={cn(
        "grid grid-rows-[auto_minmax(auto,_1fr)_minmax(auto,_240px)] gap-y-10 overflow-y-scroll rounded-2xl bg-white p-10 text-sm",
        className
      )}
      style={{ scrollbarGutter: "stable" }}
    >
      <AuthorInfo />
      <RecommendedTopic />

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
