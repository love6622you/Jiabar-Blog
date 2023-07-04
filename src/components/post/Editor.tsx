import React, { ChangeEvent, useState } from "react";

const defaultMd: string = `# iam heading`;

type EditorType = {
  initialContent?: String;
};

const Editor = ({ initialContent }: EditorType) => {
  const [markdownSource, setMarkdownSource] = useState<string>(defaultMd);

  const onChange = ({
    currentTarget: { value }
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownSource(value);
  };

  return (
    <textarea
      onChange={onChange}
      value={markdownSource}
      className="
          w-full
          resize
          overflow-auto
          whitespace-pre
          border
          border-solid
          border-gray-300
          font-mono
        "
    />
  );
};

export default Editor;
