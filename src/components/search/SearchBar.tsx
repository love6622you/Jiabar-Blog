"use client";

import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "../ui/input";

type SearchBar = {
  onSearch: (searchText: string) => void;
};

const SearchBar = ({ onSearch }: SearchBar) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // 执行搜索操作
      onSearch(searchValue);
    }
  };

  return (
    <div className="mr-auto flex items-center rounded-3xl bg-gray-100">
      <AiOutlineSearch className="ml-2.5 h-5 w-5 text-gray-400" />
      <Input
        type="text"
        className="h-8 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:h-9"
        placeholder="Search..."
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
