"use client";

import React, { KeyboardEvent, useState } from "react";
import { Input } from "../ui/input";
import { AiOutlineClose } from "react-icons/ai";
import Tag from "../shared/Tag";

type InputTagsType = {
  inputProps?: object;
};

const InputTags = ({ inputProps }: InputTagsType) => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " || event.code === "Space") {
      event.preventDefault();
    }

    if (event.key === "Enter" || event.code === "Enter") {
      event.preventDefault();
      const newTag = (event.target as HTMLInputElement).value;
      newTag &&
        setTags((prevTags) => {
          if (!prevTags.includes(inputValue)) {
            return [...prevTags];
          }
          return [...prevTags, newTag];
        });
      setInputValue("");
    }
  };

  const handleDelete = (targetTag: string) => {
    setTags((prevTag) => {
      return prevTag.filter((tag) => tag !== targetTag);
    });
  };

  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {tags.map((tag) => (
        <Tag
          className="h-6 cursor-default text-sm leading-6"
          tagName={tag}
          key={tag}
          suffix={
            <AiOutlineClose
              className="ml-2 inline-block h-4 w-4 cursor-pointer hover:text-red-400"
              onClick={() => handleDelete(tag)}
            />
          }
        />
      ))}
      <Input
        value={inputValue}
        className="w-auto border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Enter tag name"
        onKeyDown={handleKeyDown}
        {...inputProps}
      />
    </ul>
  );
};

export default InputTags;
