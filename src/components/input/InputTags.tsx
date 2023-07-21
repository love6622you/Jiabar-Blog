"use client";

import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Input } from "../ui/input";
import { AiOutlineClose } from "react-icons/ai";
import Tag from "../shared/Tag";

type InputTagsType = {
  name: string;
  tags: string[];
  setValue: Function;
  onChange: Function;
  limit: number;
  inputProps?: object;
};

const InputTags = ({
  inputProps,
  tags,
  setValue,
  name,
  onChange,
  limit
}: InputTagsType) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " " || event.code === "Space") {
      event.preventDefault();
    }

    if (event.key === "Enter" || event.code === "Enter") {
      event.preventDefault();
      if (inputValue) {
        // 根據 React-hook-form 的 setValue 響應更改值
        tags?.includes(inputValue)
          ? setValue(name, [...tags])
          : setValue(name, [...tags, inputValue]);
      }
      setInputValue("");
      onChange();
    }
  };

  const handleDelete = (targetTag: string) => {
    setValue(
      name,
      tags.filter((tag) => tag !== targetTag)
    );
    onChange();
  };

  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {tags?.map((tag) => (
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
      {tags?.length < limit && (
        <Input
          className="w-auto border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Enter tag name"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...inputProps}
        />
      )}
    </ul>
  );
};

export default InputTags;
