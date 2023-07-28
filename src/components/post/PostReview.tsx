import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { Badge } from "../ui/badge";
import { cn, getTimeAgo } from "@/lib/utils";
import dayjs from "dayjs";
import { dateTimeFormatter } from "@/constant/Formatter";

const fakeData = {
  image:
    "https://res.cloudinary.com/practicaldev/image/fetch/s--fsSLb3rv--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5vowuy74x652f9wphnea.png",
  title: "我是標題",
  tagList: ["Web", "Javascript", "Css", "Html"],
  content: `### List
  - First we have imported the required packages
  - Then we have defined the Type for our fields to use in our global store in Zustand.
  - Then we have to create the Zustand store and passed the initial values for states and setter functions for those states. We also exported this store to use in other components
  - Then we created a new instance of Apollo Client by passing 2 params URL of our graphql api and cache to set the cache value for our data?. We then passed this client instance to the Apollo Provider client prop.
  
  ### So we have setup our global state and Apollo Client to use in our React App, In next part , we will discuss how we can fetch data and display it in our React App.
  THANK YOU FOR CHECKING THIS POST
  You can contact me on -
  Instagram - https://www.instagram.com/supremacism__shubh/
  LinkedIn - https://www.linkedin.com/in/shubham-tiwari-b7544b193/
  Email - shubhmtiwri00@gmail.com
  
  ^^You can help me with some donation at the link below Thank you👇👇 ^^
  ☕ --> https://www.buymeacoffee.com/waaduheck <--
  
  Also check these posts as well
  ---
  
  <https://dev.to/shubhamtiwari909/website-components-you-should-know-25nm>
  
  <https://dev.to/shubhamtiwari909/smooth-scrolling-with-js-n56>
  
  <https://dev.to/shubhamtiwari909/swiperjs-3802>
  
  <https://dev.to/shubhamtiwari909/custom-tabs-with-sass-and-javascript-4dej>`
};

type PostViewType = {
  contentClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

const PostView = ({ contentClassName, data = {} }: PostViewType) => {
  const createdAt = dayjs(data?.createdAt).format(dateTimeFormatter["MMM D, YYYY"]);
  const timeAgo = getTimeAgo(data?.createdAt);
  return (
    <>
      {data?.image && (
        <div className="h-[200px] w-full md:h-[400px]">
          <Image
            className="h-full w-full rounded-t-2xl object-scale-down"
            src={data.image}
            alt="image"
            width={1600}
            height={900}
          />
        </div>
      )}

      <div className={cn("mx-auto mt-10 w-10/12 max-w-3xl space-y-10", contentClassName)}>
        {data?.published && (
          <div className="flex items-center gap-x-2">
            <Image
              className="inline-block h-10 w-10 rounded-full"
              alt="avatar"
              src={data?.author.image}
              width={40}
              height={40}
            />
            <p>
              {data?.author.name} <br />
              {createdAt} <span className="text-gray-400">({timeAgo})</span>
            </p>
          </div>
        )}

        <div className="space-y-5">
          <h1 className="break-words text-3xl font-bold sm:text-4xl md:text-5xl">{data?.title}</h1>
          {data?.tags?.map((tag: string, index: number) => (
            <Badge key={index} variant={"secondary"} className="mr-4">
              {tag}
            </Badge>
          ))}
        </div>

        <ReactMarkdown
          className="prose max-w-none prose-a:text-blue-400 prose-img:rounded-xl"
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkToc, remarkGfm]}
        >
          {data?.content}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default PostView;
