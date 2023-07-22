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
    <div className="ml-5 mr-auto flex items-center rounded-md border">
      <AiOutlineSearch className="ml-1.5 h-5 w-5 text-gray-300" />
      <Input
        type="text"
        className="h-8 border-none focus-visible:ring-0 focus-visible:ring-offset-0 md:h-9"
        placeholder="Search..."
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
