import React, { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";

const defaultMd: string = `# iam heading`;

type EditorType = {
  initialContent?: String;
};

const Editor = ({ initialContent }: EditorType) => {
  const [markdownSource, setMarkdownSource] = useState<string>(defaultMd);

  const onChange = ({
    currentTarget: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(value);
    setMarkdownSource(value);
  };

  return (
    <div>
      <ReactMarkdown
        className="prose  prose-a:text-blue-400 prose-img:rounded-xl"
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        remarkPlugins={[remarkMath]}
      >
        {markdownSource}
      </ReactMarkdown>
    </div>
  );
};

export default Editor;
