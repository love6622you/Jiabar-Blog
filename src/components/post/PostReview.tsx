import Image from "next/image";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import { Badge } from "../ui/badge";

const data = {
  image:
    "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/avvhvhjxawzhq221cm0a.png",
  title: "我是標題",
  tagList: ["Web", "Javascript", "Css", "Html"],
  content: `- First we have imported the required packages
  - Then we have defined the Type for our fields to use in our global store in Zustand.
  - Then we have to create the Zustand store and passed the initial values for states and setter functions for those states. We also exported this store to use in other components
  - Then we created a new instance of Apollo Client by passing 2 params URL of our graphql api and cache to set the cache value for our data. We then passed this client instance to the Apollo Provider client prop.
  
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

const PostView = () => {
  const [markdownSource, setMarkdownSource] = useState<string>(data.content);

  return (
    <div className="space-y-10">
      <div className="relative h-[300px] w-full ">
        <Image
          className="object-contain"
          src={data.image}
          alt="image"
          fill
          sizes="*"
        />
      </div>

      <div className="space-y-5">
        <h1 className="text-4xl font-bold">{data.title}</h1>
        {data.tagList.map((tag) => (
          <Badge key={tag} variant={"secondary"} className="mr-4">
            {tag}
          </Badge>
        ))}
      </div>
      <ReactMarkdown
        className="prose prose-a:text-blue-400 prose-img:rounded-xl"
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        remarkPlugins={[remarkMath]}
      >
        {markdownSource}
      </ReactMarkdown>
    </div>
  );
};

export default PostView;
